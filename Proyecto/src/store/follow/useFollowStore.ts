import { create } from 'zustand';
import { getFollowedOpportunities } from '../../actions/follow/getFollow';

interface Opportunity {
  id: number;
  code: string;
  name: string;
  type: 'agile' | 'tender';
}

interface FollowState {
  opportunities: Opportunity[];
  total: number;
  agileCount: number;
  tenderCount: number;
  loading: boolean;
  error: string | null;
  fetchFollowedOpportunities: (totalOptional: boolean) => Promise<void>;
}

export const useFollowStore = create<FollowState>((set) => ({
  opportunities: [],
  total: 0,
  agileCount: 0,
  tenderCount: 0,
  loading: false,
  error: null,

  fetchFollowedOpportunities: async (totalOptional = true) => {
    set({ loading: true, error: null });
    try {
      const data = await getFollowedOpportunities(totalOptional);

      // Contar los tipos de oportunidad
      const agileCount = data.filter((opportunity: Opportunity) => opportunity.type === 'agile').length;
      const tenderCount = data.filter((opportunity: Opportunity) => opportunity.type === 'tender').length;

      set({
        opportunities: data,
        total: data.length,
        agileCount,
        tenderCount,
        loading: false,
      });
    } catch (error) {
      set({ loading: false, error: 'Error fetching opportunities' });
    }
  },
}));
