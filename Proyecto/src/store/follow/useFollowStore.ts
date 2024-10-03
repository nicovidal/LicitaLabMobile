import { create } from 'zustand';
import { getFollowedOpportunities } from '../../actions/follow/getFollow';

interface Opportunity {
  id: number;
  code: string;
  name: string;
  type: 'agile' | 'tender'|'quote';
  closing_date:string;
}

interface FollowState {
  opportunities: Opportunity[];
  visibleOpportunities: Opportunity[]; 
  page: number;
  pageSize: number; 
  total: number;
  agileCount: number;
  tenderCount: number;
  quotesCount: number;
  loading: boolean;
  error: string | null;
  fetchFollowedOpportunities: (initialLoad?: boolean) => Promise<void>;
  loadMoreOpportunities: () => void; 
}

export const useFollowStore = create<FollowState>((set, get) => ({
  opportunities: [],
  visibleOpportunities: [], 
  page: 1,
  pageSize: 50, 
  total: 0,
  agileCount: 0,
  tenderCount: 0,
  quotesCount: 0,
  loading: false,
  error: null,

  fetchFollowedOpportunities: async (initialLoad = true) => {
    set({ loading: true, error: null });
    try {
      const data = await getFollowedOpportunities(initialLoad); 
 
      const agileCount = data.filter((opportunity: Opportunity) => opportunity.type === 'agile').length;
      const tenderCount = data.filter((opportunity: Opportunity) => opportunity.type === 'tender').length;
      const quotesCount = data.filter((opportunity: Opportunity) => opportunity.type === 'quote').length;


      const pageSize = get().pageSize;
      set({
        opportunities: data,
        visibleOpportunities: data.slice(0, pageSize), 
        total: data.length,
        agileCount,
        tenderCount,
        quotesCount,
        page: 1, 
        loading: false,
      });
    } catch (error) {
      set({ loading: false, error: 'Error fetching opportunities' });
    }
  },

  loadMoreOpportunities: () => {
    const { page, pageSize, opportunities, visibleOpportunities } = get();
    const nextPage = page + 1;
    const start = page * pageSize;
    const end = start + pageSize;

  
    set({
      visibleOpportunities: visibleOpportunities.concat(opportunities.slice(start, end)),
      page: nextPage,
    });
  },
}));
