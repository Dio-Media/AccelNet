import toast from "react-hot-toast";
import { create } from "zustand";
import api from "../lib/api"; // uses baseURL: '/api' and withCredentials: true

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  // optional helper if you want to use it later
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await api.post("/auth/signup", credentials); // -> POST /api/auth/signup
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      const message =
        error?.response?.data?.message || "Signup failed. Please try again.";
      toast.error(message);
      set({ isSigningUp: false, user: null });
      return { success: false, message };
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await api.post("/auth/login", credentials); // -> POST /api/auth/login
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      set({ isLoggingIn: false, user: null });
      return { success: false, message };
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await api.post("/auth/logout"); // -> POST /api/auth/logout
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      const message =
        error?.response?.data?.message || "Logout failed. Please try again.";
      toast.error(message);
      set({ isLoggingOut: false });
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await api.get("/auth/verify"); // -> GET /api/auth/verify
      set({ user: response.data.user || null, isCheckingAuth: false });
    } catch (error) {
      console.error("Auth check error:", error);
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
