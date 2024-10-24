import { apiLicita } from "../../config/api/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const patchSetUserProfile = async (profileData: any) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await apiLicita.patch(`/profile`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`, // Se envía el token en los headers
      },
    });

    return response.data; // Retorna los datos de la respuesta
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('No se pudo actualizar el perfil del usuario');
  }
};
