import { create } from 'zustand';
import type { EventsState } from '@/features/events/types';
import { fetchEvents } from '@/features/events/services/eventsService';

interface EventsStoreState extends EventsState {
  currentPage: number;
  itemsPerPage: number;
  loadEvents: () => Promise<void>;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
}

export const useEventsStore = create<EventsStoreState>((set, get) => ({
  events: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 9,
  
  loadEvents: async () => {
    set({ loading: true, error: null });
    try {
      const events = await fetchEvents();
      set({ events, loading: false, currentPage: 1 });
    } catch (error) {
      set({
        events: [],
        loading: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  },
  
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (items) => set({ itemsPerPage: items, currentPage: 1 }),
}));
