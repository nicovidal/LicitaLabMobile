import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiLicita } from "../../config/api/api";


export const getQuoteItems = async (code: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
    
      const response = await apiLicita.get(`/quote/${code}/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;   
    } catch (error) {
      console.error('Error fetching quote details:', error);
      throw new Error('No se pudieron obtener los detalles de la compra ágil');
    }
  };
  


















