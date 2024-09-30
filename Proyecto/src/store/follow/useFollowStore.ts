import { create } from 'zustand';
import { getFollowedOpportunities } from '../../actions/follow/getFollow';

export interface FollowState {
  opportunities: any[]; // Puedes definir un tipo más específico si lo deseas
  loading: boolean;
  error: string | null;
  fetchFollowedOpportunities: (totalOptional: boolean) => Promise<void>;
}

export const useFollowStore = create<FollowState>((set) => ({
  opportunities: [],
  loading: false,
  error: null,

  fetchFollowedOpportunities: async (totalOptional = false) => {
    set({ loading: true, error: null }); // Inicia la carga
    try {
      const data = await getFollowedOpportunities(totalOptional);
      console.log('Fetched Opportunities Data:', data); // Imprime los datos recibidos
      set({ opportunities: data, loading: false }); // Guarda las oportunidades en el estado
    } catch (error) {
      const errorMessage = (error as Error).message || 'Error desconocido';
      set({ loading: false, error: errorMessage }); // Guarda el error en el estado
    }
  },
}));
