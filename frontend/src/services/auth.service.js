/**
 * Serviço de autenticação para gerenciar login, logout e verificação de autenticação
 */
import api from './api';

const authService = {
  // Fazer login
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Fazer logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirecionar para a página de login
    window.location.href = '/login';
  },

  // Verificar se o usuário está autenticado
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token; // Retorna true se existir um token
  },

  // Obter o usuário atual
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Atualizar os dados do usuário no localStorage
  updateUserData(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  },

  // Verificar permissões do usuário (opcional)
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.roles && user.roles.includes(role);
  },

  // Atualizar token (para refresh token)
  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh-token');
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        return true;
      }
      return false;
    } catch (error) {
      this.logout();
      return false;
    }
  },

  // Verificar e renovar token periodicamente
  startTokenRefresh() {
    // Verifica o token a cada 15 minutos
    this.tokenRefreshInterval = setInterval(() => {
      this.refreshToken().catch(() => {
        this.logout();
      });
    }, 15 * 60 * 1000); // 15 minutos
  },

  // Parar a verificação periódica do token
  stopTokenRefresh() {
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
    }
  }
};

export default authService;