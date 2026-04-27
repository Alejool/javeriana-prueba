import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useEventFilters } from './useEventFilters';
import { useEventsStore } from '@/stores/useEventsStore';

// Mock the store
vi.mock('@/stores/useEventsStore', () => ({
  useEventsStore: vi.fn(),
}));

const mockEvents = [
  { id: '1', title: 'React Conf', description: 'Learn React', location: 'Bogotá', category: 'Pregrado', date: '2023-01-01', image: '', slug: 'react-conf' },
  { id: '2', title: 'Vue Summit', description: 'Learn Vue', location: 'Medellín', category: 'Posgrado', date: '2023-02-01', image: '', slug: 'vue-summit' },
  { id: '3', title: 'Angular Meetup', description: 'Learn Angular', location: 'Bogotá', category: 'Educación Continua', date: '2023-03-01', image: '', slug: 'angular-meetup' },
];

describe('useEventFilters', () => {
  let setCurrentPageMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setCurrentPageMock = vi.fn();
    (useEventsStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      events: mockEvents,
      setCurrentPage: setCurrentPageMock,
    });
  });

  it('should return all events initially', () => {
    const { result } = renderHook(() => useEventFilters());
    
    expect(result.current.searchTerm).toBe('');
    expect(result.current.selectedCategory).toBe('all');
    expect(result.current.filteredEvents).toHaveLength(3);
    expect(result.current.categoryCounts).toEqual({
      'Pregrado': 1,
      'Posgrado': 1,
      'Educación Continua': 1,
      'all': 3,
    });
  });

  it('should filter events by search term', () => {
    const { result } = renderHook(() => useEventFilters());

    act(() => {
      result.current.setSearchTerm('react');
    });

    expect(result.current.filteredEvents).toHaveLength(1);
    expect(result.current.filteredEvents[0].title).toBe('React Conf');
    expect(setCurrentPageMock).toHaveBeenCalledWith(1); // Resets pagination
  });

  it('should filter events by location', () => {
    const { result } = renderHook(() => useEventFilters());

    act(() => {
      result.current.setSearchTerm('medellín');
    });

    expect(result.current.filteredEvents).toHaveLength(1);
    expect(result.current.filteredEvents[0].title).toBe('Vue Summit');
  });

  it('should filter events by category', () => {
    const { result } = renderHook(() => useEventFilters());

    act(() => {
      result.current.setSelectedCategory('Posgrado');
    });

    expect(result.current.filteredEvents).toHaveLength(1);
    expect(result.current.filteredEvents[0].title).toBe('Vue Summit');
    expect(setCurrentPageMock).toHaveBeenCalledWith(1);
  });

  it('should update category counts based on search term', () => {
    const { result } = renderHook(() => useEventFilters());

    act(() => {
      result.current.setSearchTerm('bogotá');
    });

    // 2 events in bogota: Pregrado and Educación Continua
    expect(result.current.categoryCounts).toEqual({
      'Pregrado': 1,
      'Posgrado': 0,
      'Educación Continua': 1,
      'all': 2,
    });
  });
});
