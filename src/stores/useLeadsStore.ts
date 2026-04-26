import { createLead } from "@/features/leads/services/leadsService";
import type { Lead, LeadFormData } from "@/features/leads/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LeadsState {
  leads: Lead[];
  addLead: (formData: LeadFormData) => Lead;
  getLeadsByEvent: (eventId: number) => Lead[];
  removeLead: (id: string) => void;
  clearLeads: () => void;
  getTotalLeads: () => number;
}

export const useLeadsStore = create<LeadsState>()(
  persist(
    (set, get) => ({
      leads: [],

      addLead: (formData) => {
        const newLead = createLead(formData);

        set((state) => ({
          leads: [...state.leads, newLead],
        }));

        return newLead;
      },

      getLeadsByEvent: (eventId) => {
        return get().leads.filter((lead) => lead.eventId === eventId);
      },

      removeLead: (id) => {
        set((state) => ({
          leads: state.leads.filter((lead) => lead.id !== id),
        }));
      },

      clearLeads: () => {
        set({ leads: [] });
      },

      getTotalLeads: () => {
        return get().leads.length;
      },
    }),
    {
      name: "javeriana-leads-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
