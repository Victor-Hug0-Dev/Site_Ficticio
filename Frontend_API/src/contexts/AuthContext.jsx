import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Configuração do axios para interceptar requisições
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('token/refresh')) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
              throw new Error('Sem refresh token');
            }

            const response = await axios.post('http://192.168.0.11:8000/auth/token/refresh/', {
              refresh: refreshToken
            });

            const { access } = response.data;
            localStorage.setItem('access_token', access);
            originalRequest.headers.Authorization = `Bearer ${access}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error('Erro ao renovar token:', refreshError);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setIsAuthenticated(false);
            setUser(null);
            navigate('/login');
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  // Verifica se há token ao iniciar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          await fetchUserProfile();
        } catch (error) {
          console.error('Erro ao verificar autenticação:', error);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://192.168.0.11:8000/auth/profile/");
      setUser(response.data);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      // Criando o FormData como no Insomnia
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      // Configurando as opções exatamente como no Insomnia
      const response = await axios.post('http://192.168.0.11:8000/auth/login/', formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Resposta do login:', response.data);

      // Verificando a estrutura da resposta
      if (response.data.tokens) {
        const { access, refresh } = response.data.tokens;
        
        if (access) {
          // Salvando os tokens
          localStorage.setItem('access_token', access);
          if (refresh) {
            localStorage.setItem('refresh_token', refresh);
          }

          // Configurando o token no axios
          axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

          // Buscando o perfil do usuário
          await fetchUserProfile();
          navigate('/dashboard');
          return { success: true };
        }
      }

      return {
        success: false,
        error: "Formato de resposta não reconhecido pelo servidor"
      };

    } catch (error) {
      console.error("Erro no login:", error);
      
      let errorMessage = "Erro ao fazer login";
      
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = "Email ou senha incorretos";
            break;
          case 400:
            errorMessage = error.response.data.detail || "Dados de login inválidos";
            break;
          case 500:
            errorMessage = "Erro no servidor. Tente novamente mais tarde";
            break;
          default:
            errorMessage = error.response.data.detail || "Erro ao fazer login";
        }
      }

      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await axios.post('http://192.168.0.11:8000/auth/logout/', {
          refresh: refreshToken
        });
      }
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      setError(null);
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  const register = async (username, email, password) => {
    try {
      setError(null);
      const response = await axios.post('http://192.168.0.11:8000/auth/register/', {
        username,
        email,
        password
      });
      return { success: true };
    } catch (error) {
      console.error("Erro no registro:", error);
      return {
        success: false,
        error: error.response?.data?.detail || "Erro ao registrar usuário"
      };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      register,
      isAuthenticated,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
} 