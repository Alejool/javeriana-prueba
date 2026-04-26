import type { Lead, LeadFormData } from '@/features/leads/types';
import { STORAGE_KEYS } from '@/shared/constants';
import { saveToLocalStorage, loadFromLocalStorage } from '@/shared/utils/storage';

export const saveLeads = (leads: Lead[]): void => {
  saveToLocalStorage(STORAGE_KEYS.LEADS, leads);
};

export const loadLeads = (): Lead[] => {
  return loadFromLocalStorage<Lead[]>(STORAGE_KEYS.LEADS) || [];
};

export const createLead = (formData: LeadFormData): Lead => {
  return {
    ...formData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
};
