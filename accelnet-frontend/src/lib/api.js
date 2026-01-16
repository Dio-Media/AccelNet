import axios from "axios";

// Get API URL from environment variable
const apiOrigin = import.meta.env.VITE_API_URL || "/api";

const baseURL = apiOrigin.startsWith("http")
  ? `${apiOrigin}/api`
  : apiOrigin;

// Debug log (you can remove this later)
console.log("🔗 API Configuration:", {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  baseURL,
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV,
});

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || "";
    const configuredBase = error.config?.baseURL || baseURL;

    console.error("❌ API Error:", {
      url,
      baseURL: configuredBase,
      fullURL: `${configuredBase}${url}`,
      status: error.response?.status,
      message: error.message,
    });

    return Promise.reject(error);
  }
);

export default api;
