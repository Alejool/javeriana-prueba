export type EventCategory = 'Pregrado' | 'Posgrado' | 'Educación Continua';

export interface Event {
  id: number;
  title: string;
  description: string;
  category: EventCategory;
  date: string;
  location: string;
  imageUrl?: string;
}

export interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
}
 