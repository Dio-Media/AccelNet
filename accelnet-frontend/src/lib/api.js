import axios from 'axios';

// Create an axios instance that automatically uses the Vite proxy
const api = axios.create({
  baseURL: '/api', 
  withCredentials: true, // This will be important for auth
});

export default api;