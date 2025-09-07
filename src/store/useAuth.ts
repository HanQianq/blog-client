// src/store/useAuth.ts
import { create } from "zustand";

interface AuthState {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: "token",
  login: (token) => set({ token }),
  logout: () => set({ token: null }),
}));
