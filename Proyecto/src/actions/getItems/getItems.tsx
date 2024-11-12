import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiLicita1 } from "../../config/api/api1";
import { apiLicita } from "../../config/api/api"; // Este es el otro cliente API que mencionaste.

export const getItems = async (code: string, type: string) => {
  try {
    const token = await AsyncStorage.getItem('token');

    let endpoint = '';
    let apiClient = apiLicita1;


    if (type === 'agile') {
      endpoint = `/agile/agile-items-detail/${code}`;
    } else if (type === 'tender') {
      endpoint = `/tender/tender-items-detail/${code}`;
    } else if (type === 'quote') {
      apiClient = apiLicita;
      endpoint = `/quote/${code}/items`;
    } else if (type === 'marco_quote') {
      apiClient=apiLicita
      endpoint = `/marco/products-services/${code}`
    }
    else {
      throw new Error('Tipo no soportado');
    }


    const response = await apiClient.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
/* 
    console.log("Detalles de ítems:", response.data); */
    return response.data;

  } catch (error) {
    console.error('Error fetching items:', error);
    throw new Error('No se pudieron obtener los detalles de los ítems');
  }
};
