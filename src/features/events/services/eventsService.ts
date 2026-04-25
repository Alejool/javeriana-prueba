import axios from 'axios';
import type { Event, EventCategory } from '@/features/events/types';
import { API_ENDPOINTS } from '@/shared/constants';

const categories: EventCategory[] = ['Pregrado', 'Posgrado', 'Educación Continua'];

const getCategory = (id: number): EventCategory => {
  const index = id % categories.length;
  return categories[index];
};

const getRandomDate = (): string => {
  const start = new Date(2026, 4, 1);
  const end = new Date(2026, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

export const fetchEvents = async (): Promise<Event[]> => {
  const cachedEvents = localStorage.getItem('events');
  if (cachedEvents) {
    try {
      const parsed = JSON.parse(cachedEvents);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      localStorage.removeItem('events');
    } catch (error) {
      console.error('Error parsing cached events:', error);
      localStorage.removeItem('events');
    }
  }

  // Si no hay cache, obtener de la API
  try {
    const response = await axios.get(API_ENDPOINTS.EVENTS);
    
    if (!Array.isArray(response.data)) {
      throw new Error('Formato de respuesta de API inválido');
    }

    const posts = response.data.slice(0, 20);
    
    const events = posts.map((post: { id: number; title: string; body: string }) => ({
      id: post.id,
      title: post.title.charAt(0).toUpperCase() + post.title.slice(1),
      description: post.body,
      category: getCategory(post.id),
      date: getRandomDate(),
      location: 'Campus Universitario',
      imageUrl: `https://picsum.photos/seed/${post.id}/400/300`,
    }));

    localStorage.setItem('events', JSON.stringify(events));
    
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('No se pudieron cargar los eventos', { cause: error });
  }
};
