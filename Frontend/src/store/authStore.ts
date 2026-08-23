// store/AuthStore.ts
import { create } from "zustand";
import axios from "axios";

interface User {
  id: string;
  fullName: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true } // needed so the "token" cookie your backend sets is stored
      );
      set({ user: res.data.User ?? res.data.user, loading: false });
      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
      return false;
    }
  },

  register: async (fullName, email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(
        "/api/auth/register",
        { fullName, email, password },
        { withCredentials: true }
      );
      set({ user: res.data.user, loading: false });
      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Registration failed",
        loading: false,
      });
      return false;
    }
  },

  logout: () => set({ user: null }),
}));