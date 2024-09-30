// actions/auth/auth.ts
import { apiLicita } from "../../config/api/api"; // Asegúrate de que tu apiLicita esté configurado correctamente.
import { encode } from 'base-64'; // Importa la función encode de base-64

const returnUserToken = (data: any) => {
    const user: any = {
        id: data.userId, 
        email: data.email,
        fullName: data.fullName,
        name:data.name,
        isActive: data.isActive,
        roles: data.roles,
    };

    return {
        user: user,
        token: data.token,
  
    };
};

export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase();

    try {
        const { data } = await apiLicita.post<any>(`/auth/login?appId=CL`, {
            email: encode(email),
            password: encode(password), 
        });

        return returnUserToken(data);
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
};

// Función para validar el token
export const validateToken = async (token: string) => {
    try {
        const { data } = await apiLicita.get<any>(`/auth/validate-token`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data; 
    } catch (error) {
        console.error("Token validation error:", error);
        return null;
    }
};
