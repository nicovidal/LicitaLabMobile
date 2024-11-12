import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiLicita1 } from '../config/api/api1';


export const readNotificacion = async (id: any) => {
    try {
        const token = await AsyncStorage.getItem('token');

        const response = await apiLicita1.post(`/notifications/read`, id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
/*         console.log('Notificacion', id, 'leida', response) */
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw new Error('No se pudo actualizar el perfil del usuario');
    }
};
