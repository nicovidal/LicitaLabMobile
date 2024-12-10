import { apiLicita } from "../../config/api/api"; 
import { encode } from 'base-64'; 

const returnUserToken = (data: any) => {
    const user: any = {
        id: data.userId, 
        email: data.email,
        fullName: data.fullName,
        name:data.name,
        isActive: data.isActive,
        roles: data.roles,
    };

    const token = data.default_workspace?.token;
    return {
        user: user,
        token: token,
  
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