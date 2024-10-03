// loginAuthStore.ts
import { create } from "zustand";
import { authLogin } from "../../actions/auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthState {
  status: 'checking' | 'authenticated' | 'unauthenticated';
  token?: string;
  user?: any;
  error?: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

const StorageAdapter = {
  setItem: async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error saving data", error);
    }
  },
  getItem: async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error("Error getting data", error);
      return null;
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing data", error);
    }
  },
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,
  error: null,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    if (!resp) {
      set({
        status: 'unauthenticated',
        token: undefined,
        user: undefined,
        error: "Login failed"
      });
      return false;
    }

    await StorageAdapter.setItem('token', resp.token);
    set({
      status: 'authenticated',
      token: resp.token,
      user: {
        name: resp.user.name,
        email: resp.user.email,
        lastName: resp.user.last_name,
        isActive: resp.user.isActive,
        roles: resp.user.roles,
      },
      error: null
    });
    return true;
  },

  checkStatus: async () => {
    const token = await StorageAdapter.getItem('token');
    if (token) {
      // Aquí puedes agregar lógica para obtener el usuario del backend si es necesario
      set({ status: 'authenticated', token, user: {} }); // Cambia user a los datos reales si los tienes
    } else {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
    }
  },

  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({ status: 'unauthenticated', token: undefined, user: undefined, error: null });
  },
}));
