import axios from 'axios';
import type { Event } from '@/features/events/types';
import { getCategoryFromId, getDateFromId } from '@/features/events/utils/eventDataHelpers';

const API_EVENTS_URL = import.meta.env.VITE_API_EVENTS_URL as string;

if (!API_EVENTS_URL) {
  throw new Error('VITE_API_EVENTS_URL no está definida. Revisa tu archivo .env');
}

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

  // if not cache, get from API
  try {
    const response = await axios.get(API_EVENTS_URL);

    if (!Array.isArray(response.data)) {
      throw new Error('Formato de respuesta de API inválido');
    }

    const events = (response.data as { id: number; title: string; body: string }[]).map((post) => ({
      id: post.id,
      title: post.title.charAt(0).toUpperCase() + post.title.slice(1),
      description: post.body,
      category: getCategoryFromId(post.id),
      date: getDateFromId(post.id),
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
