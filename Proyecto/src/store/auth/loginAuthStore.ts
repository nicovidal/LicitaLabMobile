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

        console.log("Login successful:", { email, token: resp.token });

        await StorageAdapter.setItem('token', resp.token); 
        set({ 
            status: 'authenticated', 
            token: resp.token,
            error: null 
        });
        return true;
    },

    checkStatus: async () => {
        const token = await StorageAdapter.getItem('token');
        if (token) {
            set({ status: 'authenticated', token, user: {} }); // Asegúrate de definir cómo obtener el usuario
        } else {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
        }
    },

    logout: async () => {
        await StorageAdapter.removeItem('token'); // Eliminar el token de AsyncStorage
        set({ status: 'unauthenticated', token: undefined, user: undefined, error: null }); // Reiniciamos el error al cerrar sesión
    },
}));
