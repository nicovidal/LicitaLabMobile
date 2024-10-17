




import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiLicita } from '../../config/api/api';

export const getDetailsMarcoQuotes = async (code: string) => {
    try {
        const token = await AsyncStorage.getItem('token');

        const response = await apiLicita.get(`/opportunities/code/${code}/details`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("detalles marco quotes", response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching details:', error);
        throw new Error('No se pudieron obtener los detalles');
    }
};
