import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiLicita1 } from "../../config/api/api1";

export const getDetailsTenders = async (code: string) => {
  try {
    const token = await AsyncStorage.getItem('token'); 
  
    const response = await apiLicita1.get(`/tender/tender-detail/${code}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
/*     console.log("detallazos",response.data) */
    return response.data;   
  } catch (error) {
    console.error('Error fetching details:', error); 
    throw new Error('No se pudieron obtener los detalles');
  }
};
