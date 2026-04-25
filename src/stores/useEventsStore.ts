import { create } from 'zustand';
import type { Event, EventCategory, EventsState } from '@/features/events/types';
import { fetchEvents } from '@/features/events/services/eventsService';

interface EventsStoreState extends EventsState {
  currentPage: number;
  itemsPerPage: number;
  loadEvents: () => Promise<void>;
  filterEvents: (searchTerm: string, category: EventCategory | 'all') => Event[];
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
  
  filterEvents: (searchTerm, category) => {
    const { events } = get();
    
    if (!Array.isArray(events)) {
      return [];
    }

    return events.filter((event) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower);
      const matchesCategory = category === 'all' || event.category === category;
      return matchesSearch && matchesCategory;
    });
  },
  
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (items) => set({ itemsPerPage: items, currentPage: 1 }),
}));
