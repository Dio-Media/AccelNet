import axios from 'axios';

// Get API URL from environment variable
const apiUrl = import.meta.env.VITE_API_URL || '/api';

// Debug log (you can remove this later)
console.log('🔗 API Configuration:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  baseURL: apiUrl,
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV
});

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      fullURL: error.config?.baseURL + error.config?.url,
      status: error.response?.status,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default api;