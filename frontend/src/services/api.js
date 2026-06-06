import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      try {
        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
          refreshToken
        });

        localStorage.setItem('token', response.data.token);
        originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  refreshToken: (refreshToken) => api.post('/auth/refresh-token', { refreshToken })
};

export const websiteAPI = {
  getAll: () => api.get('/websites'),
  create: (data) => api.post('/websites', data),
  getById: (id) => api.get(`/websites/${id}`),
  update: (id, data) => api.put(`/websites/${id}`, data),
  delete: (id) => api.delete(`/websites/${id}`),
  launch: (id) => api.post(`/websites/${id}/launch`),
  search: (params) => api.get('/websites/search/query', { params }),
  exportCSV: () => api.get('/websites/export/csv'),
  getDashboardStats: () => api.get('/websites/stats/dashboard')
};

export const analyticsAPI = {
  getAll: () => api.get('/analytics'),
  getByWebsite: (websiteId) => api.get(`/analytics/website/${websiteId}`),
  track: (data) => api.post('/analytics/track', data),
  getSummary: () => api.get('/analytics/stats/summary')
};

export default api;