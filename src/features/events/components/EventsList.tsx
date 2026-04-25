import { EventCard } from "@/features/events/components/EventCard";
import { EventsListSkeleton } from "@/features/events/components/EventCardSkeleton";
import type { Event } from "@/features/events/types";
import { EmptyState } from "@/shared/components/EmptyState";
import { Pagination } from "@/shared/components/Pagination";
import { AlertCircle, Search } from "lucide-react";

interface EventsListProps {
  events: Event[];
  loading: boolean;
  error: string | null;
  onRegister: (event: Event) => void;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const EventsList = ({
  events,
  loading,
  error,
  onRegister,
  currentPage,
  itemsPerPage,
  onPageChange,
}: EventsListProps) => {
  if (loading) {
    return <EventsListSkeleton count={itemsPerPage} />;
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
        <p className="text-red-800 dark:text-red-300 font-semibold text-lg mb-2 font-headline">
          Error al cargar eventos
        </p>
        <p className="text-red-600 dark:text-red-400 font-body">{error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-secondary dark:bg-secondary/20 rounded-lg border border-secondary-300 dark:border-secondary-700">
        <EmptyState
          icon={Search}
          title="No se encontraron eventos"
          description="Intenta ajustar los filtros de búsqueda o explora otras categorías."
        />
      </div>
    );
  }

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEvents = events.slice(startIndex, endIndex);

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        itemsPerPage={itemsPerPage}
        totalItems={events.length}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {paginatedEvents.map((event) => (
          <EventCard key={event.id} event={event} onRegister={onRegister} />
        ))}
      </div>
    </div>
  );
};
