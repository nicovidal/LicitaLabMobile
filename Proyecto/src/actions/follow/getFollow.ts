import { apiLicita } from "../../config/api/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getFollowedOpportunities = async (totalOptional:any) => {
  const token = await AsyncStorage.getItem('token'); 

  const response = await apiLicita.get(`/opportunities/followed?total=${totalOptional}`, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });
  return response.data;
};

export { getFollowedOpportunities };
