import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get("http://192.168.0.11:8000/api/profile/", {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        }
      });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const options = {
        method: 'POST',
        url: 'http://192.168.0.11:8000/auth/login/',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          username: email,
          password: password
        }
      };

      const response = await axios.request(options);
      const { token } = response.data;
      
      if (token) {
        localStorage.setItem('token', token);
        await fetchUserProfile(token);
        return { success: true };
      } else {
        return {
          success: false,
          error: "Token não recebido do servidor"
        };
      }
    } catch (error) {
      console.error("Erro no login:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Erro ao fazer login"
      };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado');
      }

      const options = {
        method: 'POST',
        url: 'http://192.168.0.11:8000/auth/logout/',
        headers: {
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      };

      await axios.request(options);
      
      // Limpa os dados do usuário
      localStorage.removeItem('token');
      setUser(null);
      setError(null);
      setLoading(false);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo com erro, limpa os dados locais
      localStorage.removeItem('token');
      setUser(null);
      setError(null);
      setLoading(false);
      setIsAuthenticated(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post('http://192.168.0.11:8000/api/register/', {
        username,
        email,
        password
      });
      return { success: true };
    } catch (error) {
      console.error("Erro no registro:", error);
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
      isAuthenticated: !!user 
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