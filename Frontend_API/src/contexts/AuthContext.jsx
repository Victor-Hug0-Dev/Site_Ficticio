import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Configuração do axios para interceptar requisições
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Requisição sendo enviada:', config);
        return config;
      },
      (error) => {
        console.error('Erro no interceptor de requisição:', error);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        console.log('Resposta recebida:', response);
        return response;
      },
      async (error) => {
        console.error('Erro na resposta:', error.response || error);
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          console.log('Tentando renovar o token...');
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            console.log('Refresh token:', refreshToken);
            
            const response = await axios.post('http://192.168.0.9:8000/auth/token/refresh/', {
              refresh: refreshToken
            });
            
            console.log('Novo token recebido:', response.data);
            const { access } = response.data;
            localStorage.setItem('access_token', access);
            originalRequest.headers.Authorization = `Bearer ${access}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error('Erro ao renovar token:', refreshError.response || refreshError);
            logout();
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
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    console.log('Token de acesso encontrado:', accessToken);
    if (accessToken) {
      fetchUserProfile();
    } else {
      setLoading(false);
      setIsAuthenticated(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      console.log('Buscando perfil do usuário...');
      const response = await axios.get("http://192.168.0.9:8000/auth/profile/");
      console.log('Perfil recebido:', response.data);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro detalhado ao buscar perfil:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('Iniciando login...');
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      console.log('Dados do formulário:', {
        email,
        password: '***'
      });

      const response = await axios.post('http://192.168.0.9:8000/auth/login/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('Resposta completa do servidor:', response);
      console.log('Dados da resposta:', response.data);

      // Verificando a estrutura da resposta
      const responseData = response.data;
      
      // Acessando os tokens dentro do objeto tokens
      if (responseData.tokens) {
        const { access, refresh } = responseData.tokens;
        
        if (access) {
          localStorage.setItem('access_token', access);
          if (refresh) {
            localStorage.setItem('refresh_token', refresh);
          }
          await fetchUserProfile();
          return { success: true };
        }
      }

      console.error('Estrutura da resposta não reconhecida:', responseData);
      return {
        success: false,
        error: "Formato de resposta não reconhecido pelo servidor"
      };
    } catch (error) {
      console.error("Erro detalhado no login:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      return {
        success: false,
        error: error.response?.data?.message || "Erro ao fazer login"
      };
    }
  };

  const logout = async () => {
    try {
      console.log('Iniciando logout...');
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await axios.post('http://192.168.0.9:8000/auth/logout/', {
          refresh: refreshToken
        });
        console.log('Logout realizado com sucesso no servidor');
      }
    } catch (error) {
      console.error('Erro detalhado no logout:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      setError(null);
      setIsAuthenticated(false);
      setLoading(false);
      console.log('Dados locais limpos após logout');
    }
  };

  const register = async (username, email, password) => {
    try {
      console.log('Iniciando registro...');
      const response = await axios.post('http://192.168.0.9:8000/auth/register/', {
        username,
        email,
        password
      });
      console.log('Resposta do registro:', response.data);
      return { success: true };
    } catch (error) {
      console.error("Erro detalhado no registro:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      return {
        success: false,
        error: error.response?.data?.message || "Erro ao registrar usuário"
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