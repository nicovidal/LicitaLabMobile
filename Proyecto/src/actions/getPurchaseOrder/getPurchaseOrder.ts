
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiLicitaPurchaseOrder } from "../../config/api/api_purchase_order";

const getPurchaseOrder = async (initialLoad: boolean) => {
  const token = await AsyncStorage.getItem('token'); 

  const response = await apiLicitaPurchaseOrder.get(`/purchase-order?page=1&pageSize=100`, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  });

  return response.data;
};

export { getPurchaseOrder };
