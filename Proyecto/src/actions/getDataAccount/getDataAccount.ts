import { apiLicita } from "../../config/api/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDataAccount = async () => {
  try {
    const token = await AsyncStorage.getItem('token'); 
  
    const response = await apiLicita.get(`/profile`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data;   
  } catch (error) {
    console.error('Error fetching details:', error); 
    throw new Error('No se pudieron obtener los detalles');
  }
};
