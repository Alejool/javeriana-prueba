import type { LeadFormData } from '@/shared/schemas/leadSchema';

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  eventId: number;
  eventTitle: string;
  createdAt: string;
}

export type { LeadFormData };

export interface LeadsContextType {
  leads: Lead[];
  addLead: (lead: LeadFormData) => void;
  getLeadsByEvent: (eventId: number) => Lead[];
}
