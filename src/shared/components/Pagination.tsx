import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <nav
      aria-label={`Paginación de eventos, página ${currentPage} de ${totalPages}`}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700"
    >
      <p 
        className="text-sm text-neutral-600 dark:text-dark-text-secondary font-body"
        aria-live="polite"
      >
        Mostrando <span className="font-semibold text-primary-600 dark:text-primary-400">{startItem}</span> a{' '}
        <span className="font-semibold text-primary-600 dark:text-primary-400">{endItem}</span> de{' '}
        <span className="font-semibold text-primary-600 dark:text-primary-400">{totalItems}</span> resultados
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Ir a la página anterior"
        >
          <ChevronLeft className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
        </button>

        <ol className="flex gap-1" aria-label="Lista de páginas">
          {getPageNumbers().map((page, index) => (
            <li key={index}>
              {typeof page === 'number' ? (
                <button
                  onClick={() => onPageChange(page)}
                  aria-current={currentPage === page ? 'page' : undefined}
                  aria-label={`Ir a la página ${page}${currentPage === page ? ', página actual' : ''}`}
                  className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-white dark:bg-primary-600'
                      : 'border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span
                  className="min-w-[40px] h-10 px-3 flex items-center justify-center text-neutral-500 dark:text-neutral-500"
                  aria-hidden="true"
                >
                  {page}
                </span>
              )}
            </li>
          ))}
        </ol>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Ir a la página siguiente"
        >
          <ChevronRight className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
        </button>
      </div>
    </nav>
  );
};
