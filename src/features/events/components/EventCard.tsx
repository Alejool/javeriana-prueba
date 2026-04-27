import type { Event, EventCategory } from "@/features/events/types";
import { Button } from "@/shared/components/Button";
import { Card } from "@/shared/components/Card";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { formatDateLong } from "@/shared/utils/dateFormatter";
import { useLeadsStore } from "@/stores/useLeadsStore";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, MapPin, Tag, User } from "lucide-react";
import { useState } from "react";

interface EventCardProps {
  event: Event;
  onRegister: (event: Event) => void;
}

const categoryConfig: Record<
  EventCategory,
  { badge: string; borderColor: string }
> = {
  Pregrado: {
    badge:
      "bg-primary-50 text-primary-800 border border-primary-300 dark:bg-primary-900/80 dark:text-primary-100 dark:border-primary-700",
    borderColor: "border-primary",
  },
  Posgrado: {
    badge:
      "bg-secondary-50 text-secondary-900 border border-secondary-300 dark:bg-secondary-900/80 dark:text-secondary-100 dark:border-secondary-700",
    borderColor: "border-secondary-500",
  },
  "Educación Continua": {
    badge:
      "bg-secondary-50 text-secondary-900 border border-secondary-300 dark:bg-secondary-900/80 dark:text-secondary-100 dark:border-secondary-600",
    borderColor: "border-secondary-500",
  },
};

export const EventCard = ({ event, onRegister }: EventCardProps) => {
  const getLeadsByEvent = useLeadsStore((state) => state.getLeadsByEvent);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isExpanded, setIsExpanded] = useState(false);

  const isRegistered = getLeadsByEvent(event.id).length > 0;
  const config = categoryConfig[event.category];
  const isLongDescription = event.description.length > 120;

  return (
    <motion.article
      initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: isMobile ? 0 : 0.3 }}
      whileHover={
        isMobile ? undefined : { y: -8, transition: { duration: 0.2 } }
      }
      className="h-full"
      aria-label={`Evento: ${event.title}${isRegistered ? ", ya registrado" : ""}`}
    >
      <Card
        hover={!isMobile}
        className={`overflow-hidden group border-t-4 ${config.borderColor} h-full flex flex-col`}
      >
        <div className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
          {event.imageUrl && (
            <motion.img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-48 object-cover"
              loading="lazy"
              decoding="async"
              whileHover={isMobile ? undefined : { scale: 1.05 }}
              transition={{ duration: isMobile ? 0 : 0.3 }}
            />
          )}
          {isRegistered && (
            <div
              className="absolute top-2 right-2 flex items-center gap-1 bg-green-600 text-white text-xs font-semibold font-label px-2.5 py-1 rounded-full shadow-md"
              aria-hidden="true"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Ya registrado
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold font-label ${config.badge}`}
            >
              <Tag className="w-3 h-3" />
              {event.category}
            </span>
          </div>

          <h3 className="text-xl font-headline font-bold text-neutral-900 dark:text-neutral-50 mb-3 line-clamp-2 group-hover:text-primary dark:group-hover:text-primary-300 transition-colors">
            {event.title}
          </h3>

          <div className="mb-4">
            <p
              className={`text-neutral-600 dark:text-neutral-300 text-sm font-body leading-relaxed transition-all duration-300 ${isExpanded ? "" : "line-clamp-3"}`}
            >
              {event.description}
            </p>
            {isLongDescription && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="text-primary-600 dark:text-primary-400 text-xs font-bold mt-1.5 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-1 -ml-1"
                aria-expanded={isExpanded}
              >
                {isExpanded ? "Ver menos" : "Ver más"}
              </button>
            )}
          </div>

          <div className="mt-auto">
            <div className="flex flex-col gap-2 mb-5 text-sm font-body border-t border-neutral-200 dark:border-neutral-700 pt-4">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <Calendar className="w-4 h-4 text-primary dark:text-primary-300" />
                <span>{formatDateLong(event.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <MapPin className="w-4 h-4 text-primary dark:text-primary-300" />
                <span>{event.location}</span>
              </div>
            </div>

            {isRegistered ? (
              <Button
                onClick={() => onRegister(event)}
                variant="outline"
                icon={<CheckCircle className="w-4 h-4" />}
                fullWidth
              >
                Registrar otro interesado
              </Button>
            ) : (
              <Button
                onClick={() => onRegister(event)}
                variant="primary"
                icon={<User className="w-4 h-4" />}
                fullWidth
              >
                Registrar Interesado
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.article>
  );
};
