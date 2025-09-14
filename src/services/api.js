import axios from 'axios';

// Configuración base de Axios
const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error de API:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Tiempo de espera agotado. Verifica tu conexión a internet.');
    }
    
    if (error.response) {
      // El servidor respondió con un código de error
      const message = error.response.data?.message || 'Error del servidor';
      throw new Error(message);
    } else if (error.request) {
      // No se recibió respuesta del servidor
      throw new Error('No se pudo conectar con el servidor. Asegúrate de que el backend esté ejecutándose en el puerto 3000.');
    } else {
      // Error en la configuración de la petición
      throw new Error('Error al configurar la petición');
    }
  }
);

// Servicios de la API
export const todoAPI = {
  // Obtener todas las tareas
  getAllTodos: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    
    const response = await api.get(`/todos?${params.toString()}`);
    return response.data;
  },

  // Obtener una tarea específica
  getTodoById: async (id) => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  // Crear nueva tarea
  createTodo: async (todoData) => {
    const response = await api.post('/todos', todoData);
    return response.data;
  },

  // Actualizar tarea
  updateTodo: async (id, todoData) => {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data;
  },

  // Alternar estado de completado
  toggleTodo: async (id) => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  },

  // Eliminar tarea
  deleteTodo: async (id) => {
    console.log('API: Enviando DELETE request para ID:', id);
    const response = await api.delete(`/todos/${id}`);
    console.log('API: Respuesta recibida:', response);
    return response.data;
  },

  // Obtener estadísticas
  getStats: async () => {
    const response = await api.get('/todos/stats/summary');
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    console.log('Testing backend connection...');
    const response = await api.get('/health');
    console.log('Backend health check response:', response);
    return response.data;
  },
};

export default api;
