import { create } from "zustand";

export const useStore = create((set) => ({
  authData: null,

  setAuthData: (authData) => {
    set({ authData });
  }
}));
