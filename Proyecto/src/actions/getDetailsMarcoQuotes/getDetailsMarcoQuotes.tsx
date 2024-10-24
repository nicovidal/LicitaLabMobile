import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiLicita } from '../../config/api/api';

export const getDetailsMarcoQuotes = async (code: string) => {
    try {
        const token = await AsyncStorage.getItem('token');

        // Hacer las solicitudes a ambas APIs en paralelo
        const [detailsResponse, marcoResponse] = await Promise.all([
            apiLicita.get(`/opportunities/code/${code}/details`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            apiLicita.get(`/marco/detail-marco/${code}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        ]);

        console.log("Detalles marco quotes", detailsResponse.data);
   /*      console.log("Detalles marco", marcoResponse.data);
 */

        return {
            marcoQuotes: detailsResponse.data,
            marcoDetail: marcoResponse.data,
        };
    } catch (error) {
        console.error('Error fetching details:', error);
        throw new Error('No se pudieron obtener los detalles');
    }
};
