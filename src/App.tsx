import { useEffect, useMemo, useState } from "react";

import { EventFilters } from "@/features/events/components/EventFilters";
import { EventsList } from "@/features/events/components/EventsList";
import type { Event, EventCategory } from "@/features/events/types";
import { Footer } from "@/shared/components/Footer";
import { Header } from "@/shared/components/Header";
import { Toast } from "@/shared/components/Toast";
import { useEventsStore } from "@/stores/useEventsStore";
import { AnimatePresence } from "framer-motion";

function App() {
  const {
    events,
    loading,
    error,
    loadEvents,
    filterEvents,
    currentPage,
    itemsPerPage,
    setCurrentPage,
  } = useEventsStore();

  // Local state
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  // localStorage filters
  const [searchTerm, setSearchTerm] = useState(() => {
    const saved = localStorage.getItem("eventSearchTerm");
    return saved || "";
  });

  const [selectedCategory, setSelectedCategory] = useState<
    EventCategory | "all"
  >(() => {
    const saved = localStorage.getItem("eventSelectedCategory");
    return (saved as EventCategory | "all") || "all";
  });

  // filters persistence
  useEffect(() => {
    localStorage.setItem("eventSearchTerm", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("eventSelectedCategory", selectedCategory);
  }, [selectedCategory]);

  // Load events
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // Filter events useMemo
  const filteredEvents = useMemo(() => {
    if (!events) return [];
    return filterEvents(searchTerm, selectedCategory);
  }, [events, searchTerm, selectedCategory, filterEvents]);

  // Reset page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, setCurrentPage]);

  const handleRegister = (event: Event) => {
    console.log("Register intended for event:", event);
    setToast({
      message: `Funcionalidad de registro próximamente para: ${event.title}`,
      type: "info",
    });
  };

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
        </div>

        <EventFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
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

      {/* Notificación */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
