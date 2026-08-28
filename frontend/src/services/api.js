import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (username, password) => api.post('/auth/login', { username, password }),
  register: (username, email, password) => api.post('/auth/register', { username, email, password }),
  me: () => api.get('/auth/me'),
};

export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getOne: (id) => api.get(`/projects/${id}`),
  create: (name, description) => api.post('/projects', { name, description }),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  getTasks: (id) => api.get(`/projects/${id}/tasks`),
};

export const tasksAPI = {
  getAll: (projectId) => api.get('/tasks', { params: { project_id: projectId } }),
  getOne: (id) => api.get(`/tasks/${id}`),
  create: (title, projectId, description, status, priority) => api.post('/tasks', { title, project_id: projectId, description, status, priority }),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
};

export const aiAPI = {
  suggestPriority: (title, description) => api.post('/ai/suggest-priority', { title, description }),
  enhanceTask: (title, description) => api.post('/ai/enhance-task', { title, description }),
  getTips: () => api.get('/ai/productivity-tips'),
};

export default api;
