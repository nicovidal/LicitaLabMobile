import { apiLicita } from "../../config/api/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const closeThisWeek = async () => {
  const token = await AsyncStorage.getItem('token'); 

  const response = await apiLicita.get(`/dashboard/closing-events`, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });
  console.log(response.data)
  return response.data;
};

export { closeThisWeek};
