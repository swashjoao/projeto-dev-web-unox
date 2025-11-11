import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Changed to port 3000 and added /api
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Importante para enviar cookies de autenticação
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros globais
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Tratamento de erros com base no status HTTP
      switch (error.response.status) {
        case 401:
          // Redirecionar para login se não autorizado
          if (window.location.pathname !== '/login') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
          break;
        case 403:
          console.error('Acesso negado:', error.response.data);
          break;
        case 404:
          console.error('Recurso não encontrado:', error.response.config.url);
          break;
        case 500:
          console.error('Erro interno do servidor:', error.response.data);
          break;
        default:
          console.error('Erro na requisição:', error.response.status, error.response.data);
      }
    } else if (error.request) {
      console.error('Sem resposta do servidor');
    } else {
      console.error('Erro ao configurar a requisição:', error.message);
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  login: (credentials) => api.post('/login', credentials),
  register: (userData) => api.post('/create', userData),
};

// Other API endpoints can be added here
// export const users = {
//   getAll: () => api.get('/users'),
//   // ...
// };

export default api;