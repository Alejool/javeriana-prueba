import { useCallback, useEffect, useState } from "react";

import { EventFilters } from "@/features/events/components/EventFilters";
import { EventsList } from "@/features/events/components/EventsList";
import { useEventFilters } from "@/features/events/hooks/useEventFilters";
import type { Event } from "@/features/events/types";
import { LeadForm } from "@/features/leads/components/LeadForm";
import { LeadsHistory } from "@/features/leads/components/LeadsHistory";
import type { LeadFormData } from "@/features/leads/types";
import { Button } from "@/shared/components/Button";
import { Footer } from "@/shared/components/Footer";
import { Header } from "@/shared/components/Header";
import { Toast } from "@/shared/components/Toast";
import { useEventsStore } from "@/stores/useEventsStore";
import { useLeadsStore } from "@/stores/useLeadsStore";
import { AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";

function App() {
  // Stores
  const { addLead, leads } = useLeadsStore();
  const { loading, error, loadEvents, currentPage, itemsPerPage, setCurrentPage } =
    useEventsStore();

  // Filter logic is fully encapsulated in this hook (point 1 & 3)
  const { searchTerm, selectedCategory, filteredEvents, categoryCounts, setSearchTerm, setSelectedCategory } =
    useEventFilters();

  // Local UI state
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  // Load events on mount
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // Stable handler references
  const handleRegister = useCallback((event: Event) => {
    setSelectedEvent(event);
  }, []);

  const handleCloseForm = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  const handleCloseHistory = useCallback(() => {
    setIsHistoryOpen(false);
  }, []);

  const handleCloseToast = useCallback(() => {
    setToast(null);
  }, []);

  const handleSubmitLead = useCallback(
    (data: LeadFormData) => {
      try {
        const newLead = addLead(data);
        setToast({
          message: `¡Lead ${newLead.fullName} registrado exitosamente!`,
          type: "success",
        });
      } catch (err) {
        console.error(err);
        setToast({
          message: "Error al registrar el lead",
          type: "error",
        });
      }
    },
    [addLead]
  );

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 transition-colors duration-200">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-headline font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Oferta Académica
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-lg font-body">
              Explora nuestros programas y registra nuevos interesados
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <Button
              variant="outline"
              onClick={() => setIsHistoryOpen(true)}
              icon={<Users className="w-4 h-4 " />}
              iconPosition="left"
            >
              Ver Registros ({leads.length})
            </Button>
          </div>
        </div>

        <EventFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categoryCounts={categoryCounts}
        />

        <EventsList
          events={filteredEvents}
          loading={loading}
          error={error}
          onRegister={handleRegister}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </main>

      <Footer />

      <AnimatePresence>
        {selectedEvent && (
          <LeadForm
            event={selectedEvent}
            onSubmit={handleSubmitLead}
            onClose={handleCloseForm}
          />
        )}
      </AnimatePresence>

      <LeadsHistory isOpen={isHistoryOpen} onClose={handleCloseHistory} />

      {/* Toast  */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={handleCloseToast}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
