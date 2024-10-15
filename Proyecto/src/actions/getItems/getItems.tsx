import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiLicita1 } from "../../config/api/api1";


export const getItems = async (code: string, type: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const endpoint = type === 'agile' 
      ? `/agile/agile-items-detail/${code}` 
      : `/tender/tender-items-detail/${code}`;

    const response = await apiLicita1.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log("Detalles de ítems:", response.data);
    return response.data;   
  } catch (error) {
    console.error('Error fetching items:', error);
    throw new Error('No se pudieron obtener los detalles de los ítems');
  }
};