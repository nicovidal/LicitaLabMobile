import { create } from 'zustand';
import { getPurchaseOrder } from '../../actions/getPurchaseOrder/getPurchaseOrder';

interface PurchaseOrder {
    code: string;
    currencyType: string;
    funding_source: string;
    organismName: string;
    reviewStatus: string;
    key: string;
    name: string;
    net_total: number;
    shippingDate: string;
    statusCode: number;
    urlPdf: string; // Define urlPdf como string
}

interface PurchaseOrderState {
    purchaseOrder: PurchaseOrder[];
    loading: boolean;
    error: string | null;
    fetchPurchaseOrder: (initialLoad?: boolean) => Promise<void>;
}

// Implementación del store
export const usePurchaseOrderStore = create<PurchaseOrderState>((set) => ({
    purchaseOrder: [],
    loading: true, // Estado de carga inicial
    error: null, // Estado de error inicial

    fetchPurchaseOrder: async (initialLoad = true) => {
        set({ loading: true, error: null });
        try {
            const response = await getPurchaseOrder(initialLoad);

            set({
                purchaseOrder: response.data.map((item:any) => ({
                    ...item,
                    urlPdf: item.urlPdf || '' // Asegúrate de que urlPdf tenga un valor
                })) || [],
                loading: false,
            });
        } catch (error) {
            set({ loading: false, error: 'Error fetching purchaseOrder' });
            console.error('Error fetching purchaseOrder:', error); // Log del error para más detalles
        }
    },
}));
