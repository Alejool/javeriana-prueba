import { useMemo, useEffect, useState } from 'react';
import type { Event, EventCategory } from '@/features/events/types';
import { useEventsStore } from '@/stores/useEventsStore';

interface UseEventFiltersReturn {
  searchTerm: string;
  selectedCategory: EventCategory | 'all';
  filteredEvents: Event[];
  categoryCounts: Record<EventCategory | 'all', number>;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: EventCategory | 'all') => void;
}

/**
 * Encapsulates all filter logic for events:
 * - search by title, description, location
 * - filter by category
 * - reset pagination to page 1 when filters change
 */
export function useEventFilters(): UseEventFiltersReturn {
  const { events, setCurrentPage } = useEventsStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, setCurrentPage]);

  const filteredEvents = useMemo(() => {
    if (!Array.isArray(events) || events.length === 0) return [];

    const searchLower = searchTerm.toLowerCase().trim();

    return events.filter((event) => {
      const matchesSearch =
        searchLower === '' ||
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower);

      const matchesCategory =
        selectedCategory === 'all' || event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<EventCategory | 'all', number> = {
      'Pregrado': 0,
      'Posgrado': 0,
      'Educación Continua': 0,
      'all': 0
    };
    if (!Array.isArray(events)) return counts;

    const searchLower = searchTerm.toLowerCase().trim();

    events.forEach(event => {
      const matchesSearch =
        searchLower === '' ||
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower);

      if (matchesSearch) {
        counts['all']++;
        if (event.category in counts) {
          counts[event.category]++;
        }
      }
    });
    return counts;
  }, [events, searchTerm]);


  return {
    searchTerm,
    selectedCategory,
    filteredEvents,
    categoryCounts,
    setSearchTerm,
    setSelectedCategory,
  };
}
