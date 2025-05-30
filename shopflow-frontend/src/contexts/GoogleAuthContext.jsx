import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleAuthContext = createContext({});

export function GoogleAuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica se há token ao iniciar
  useEffect(() => {
    const token = localStorage.getItem('google_access_token');
    if (token) {
      setIsAuthenticated(true);
      // Tenta buscar o perfil do usuário
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('http://192.168.0.11:8000/auth/profile/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Perfil do usuário carregado:', response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao carregar perfil do usuário:', error);
    }
  };

  const loginWithGoogle = async (credential) => {
    try {
      setError(null);
      setLoading(true);

      console.log('Iniciando login com Google, credential:', credential);

      // Autenticação com Google
      const response = await axios.post('http://192.168.0.11:8000/api/auth/google/', {
        access_token: credential
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('Resposta do Google:', response.data);

      if (response.data.key) {
        // Salva o token do Google como access_token
        localStorage.setItem('access_token', response.data.key);
        localStorage.setItem('google_access_token', response.data.key);
        
        // Configura o token no axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.key}`;

        // Busca o perfil do usuário
        try {
          const profileResponse = await axios.get('http://192.168.0.11:8000/auth/profile/', {
            headers: {
              'Authorization': `Bearer ${response.data.key}`
            }
          });
          
          console.log('Perfil do usuário:', profileResponse.data);
          setUser(profileResponse.data);
          
          // Marca como autenticado
          setIsAuthenticated(true);

          // Força o redirecionamento para o dashboard
          console.log('Redirecionando para o dashboard...');
          navigate('/dashboard', { replace: true });
          return { success: true };
        } catch (profileError) {
          console.error('Erro ao buscar perfil:', profileError);
          // Mesmo com erro no perfil, consideramos o login bem sucedido
          // pois o token foi recebido e salvo
          setIsAuthenticated(true);
          console.log('Redirecionando para o dashboard (após erro no perfil)...');
          navigate('/dashboard', { replace: true });
          return { success: true };
        }
      }

      return {
        success: false,
        error: "Erro ao processar autenticação com Google"
      };
    } catch (error) {
      console.error("Erro detalhado no login com Google:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data
        }
      });
      
      let errorMessage = "Erro ao fazer login com Google";
      
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = "Falha na autenticação com Google";
            break;
          case 400:
            errorMessage = error.response.data.detail || "Dados inválidos";
            break;
          case 500:
            errorMessage = "Erro no servidor. Tente novamente mais tarde";
            break;
          default:
            errorMessage = error.response.data.detail || "Erro ao fazer login com Google";
        }
      }

      setIsAuthenticated(false);
      setUser(null);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const logoutGoogle = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('google_access_token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <GoogleAuthContext.Provider value={{
      loading,
      error,
      isAuthenticated,
      user,
      loginWithGoogle,
      logoutGoogle
    }}>
      {children}
    </GoogleAuthContext.Provider>
  );
}

export function useGoogleAuth() {
  const context = useContext(GoogleAuthContext);
  if (!context) {
    throw new Error('useGoogleAuth deve ser usado dentro de um GoogleAuthProvider');
  }
  return context;
} 