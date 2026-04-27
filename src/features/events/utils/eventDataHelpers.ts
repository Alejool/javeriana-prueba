import type { EventCategory } from '@/features/events/types';

const categories: EventCategory[] = ['Pregrado', 'Posgrado', 'Educación Continua'];

/**
 * Derives an EventCategory deterministically from a numeric id.
 * Uses modulo over the fixed categories array so the result is
 * always consistent for the same id.
 */
export const getCategoryFromId = (id: number): EventCategory => {
  return categories[id % categories.length];
};

/**
 * Derives a deterministic date string (YYYY-MM-DD) from a numeric id.
 * A prime multiplier (37) distributes values evenly across the year
 * so the same id always produces the same date without randomness.
 */
export const getDateFromId = (id: number): string => {
  const dayOfYear = (id * 37) % 365;
  const date = new Date(2026, 0, 1);
  date.setDate(date.getDate() + dayOfYear);
  return date.toISOString().split('T')[0];
};
