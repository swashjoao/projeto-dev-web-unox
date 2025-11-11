import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar autenticação ao carregar o componente
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Configurar o token no cabeçalho das requisições
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Aqui você pode fazer uma requisição para verificar se o token é válido
          // e obter os dados do usuário
          // const response = await axios.get('/api/auth/me');
          // setUser(response.data);
          
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

// Função de login
    const login = async (email, password) => {
        try {
            const response = await axios.post('/login', { email, password });
            const { token, user } = response.data;

            // Armazenar o token no localStorage
            localStorage.setItem('token', token);

            // Configurar o token no cabeçalho das requisições
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser(user);
            setIsAuthenticated(true);
            navigate('/');
            return { success: true };
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Erro ao fazer login. Tente novamente.'
            };
        }
    };

    // Função de registro
    const register = async (userData) => {
        try {
            const response = await axios.post('/create', userData);
            const { token, user } = response.data;

            // Armazenar o token no localStorage
            localStorage.setItem('token', token);

            // Configurar o token no cabeçalho das requisições
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser(user);
            setIsAuthenticated(true);
            navigate('/');
            return { success: true };
        } catch (error) {
            console.error('Erro ao registrar:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Erro ao registrar. Tente novamente.'
            };
        }
    };

  // Função de logout
  const logout = () => {
    // Remover o token do localStorage
    localStorage.removeItem('token');
    
    // Remover o token do cabeçalho das requisições
    delete axios.defaults.headers.common['Authorization'];
    
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Se ainda estiver carregando, não renderizar nada
  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;