import { useEffect, useState } from "react";

import { EventsList } from "@/features/events/components/EventsList";
import type { Event } from "@/features/events/types";
import { Footer } from "@/shared/components/Footer";
import { Header } from "@/shared/components/Header";
import { useEventsStore } from "@/stores/useEventsStore";

function App() {
  const {
    events,
    loading,
    error,
    loadEvents,
  } = useEventsStore();

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleRegister = (event: Event) => {
    console.log("Register for event:", event);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 transition-colors duration-200">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h2 className="text-3xl font-headline font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Oferta Académica
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-lg font-body">
            Explora nuestros programas académicos
          </p>
        </div>

        <EventsList
          events={events}
          loading={loading}
          error={error}
          onRegister={handleRegister}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;

