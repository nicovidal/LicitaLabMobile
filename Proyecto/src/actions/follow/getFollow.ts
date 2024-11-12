import { apiLicita } from "../../config/api/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getFollowedOpportunities = async (totalOptional: any) => {
  const token = await AsyncStorage.getItem('token');

  try {
    const response = await apiLicita.get(`/opportunities/followed?total=${totalOptional}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data)
    return response.data;

  } catch (error) {
    console.error('Error fetching follow:', error); 
    throw new Error('No se pudieron obtener seguimiento');
  }


};

export { getFollowedOpportunities };
