import { create } from "zustand";

export const useStore = create((set) => ({
  authData: null,
  token: null,
  authEndpoints: null,
  setAuthData: (authData) => {
    set({ authData });
  },
  setToken: (token) => {
    set({ token });
  },
  setAuthEndpoints: (authEndpoints) => {
    set({ authEndpoints });
  },
}));
