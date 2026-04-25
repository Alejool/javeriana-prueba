import type { EventCategory } from "@/features/events/types";
import { EVENT_CATEGORIES } from "@/shared/constants";
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Grid3x3,
  Search,
} from "lucide-react";

interface EventFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: EventCategory | "all";
  onCategoryChange: (category: EventCategory | "all") => void;
}

const getCategoryIcon = (category: EventCategory | "all") => {
  const iconClass = "w-4 h-4";
  switch (category) {
    case "Pregrado":
      return <GraduationCap className={iconClass} />;
    case "Posgrado":
      return <BookOpen className={iconClass} />;
    case "Educación Continua":
      return <Briefcase className={iconClass} />;
    case "all":
      return <Grid3x3 className={iconClass} />;
    default:
      return null;
  }
};

export const EventFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: EventFiltersProps) => {
  return (
    <section 
      aria-labelledby="filters-title"
      className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm dark:shadow-lg dark:shadow-black/30 p-6 mb-8 border border-neutral-200 dark:border-neutral-800"
    >
      <h2 id="filters-title" className="sr-only">Filtros de búsqueda</h2>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2 font-body">
          Buscar eventos
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre, descripción o ubicación..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-primary-400 focus:border-primary dark:focus:border-primary-400 outline-none transition-all bg-neutral-50 dark:bg-neutral-800 focus:bg-white dark:focus:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 font-body"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3 font-body">
          Filtrar por categoría
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => onCategoryChange("all")}
            className={`
              flex items-center justify-center gap-1 px-4 py-2 rounded-lg font-medium transition-all
              ${
                selectedCategory === "all"
                  ? "bg-primary dark:bg-primary text-white shadow-md border border-primary dark:border-primary"
                  : "bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
              }
            `}
          >
            {getCategoryIcon("all")}
            <span className="font-body text-sm">Todos</span>
          </button>

          {EVENT_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                flex items-center justify-center gap-1 px-4 py-2 rounded-lg font-medium transition-all
                ${
                  selectedCategory === category
                    ? "bg-primary dark:bg-primary text-white shadow-md border border-primary dark:border-primary"
                    : "bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
                }
              `}
            >
              {getCategoryIcon(category)}
              <span className="font-body text-sm">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {(searchTerm || selectedCategory !== "all") && (
        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-sm text-neutral-600 dark:text-neutral-400 font-body">
              Filtros activos:
            </span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 dark:bg-primary-500 text-primary-700 dark:text-primary-100 rounded-lg text-sm font-medium border border-primary-200 dark:border-primary-800 break-words whitespace-normal max-w-full">
                <Search className="w-3 h-3 flex-shrink-0" />
                <span className="break-words">{searchTerm}</span>
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 dark:bg-primary-500 text-primary-700 dark:text-primary-100 rounded-lg text-sm font-medium border border-primary-200 dark:border-primary-800 break-words whitespace-normal max-w-full">
                <span className="flex-shrink-0">
                  {getCategoryIcon(selectedCategory)}
                </span>
                <span className="break-words">{selectedCategory}</span>
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
