import { Button } from "@/shared/components/Button";
import { formatDateLong } from "@/shared/utils/dateFormatter";
import { useLeadsStore } from "@/stores/useLeadsStore";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Mail, Phone, Trash2, Users, X } from "lucide-react";

import { handleBackdropClick } from "@/shared/utils/events";

interface LeadsHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadsHistory = ({ isOpen, onClose }: LeadsHistoryProps) => {
  const { leads, removeLead, clearLeads } = useLeadsStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => handleBackdropClick(e, onClose)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-neutral-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
          >
            <div className="bg-primary text-white px-6 py-4 flex justify-between items-center ">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-headline font-bold">
                    Historial de Leads
                  </h2>
                  <p className="text-primary-100 text-xs font-body">
                    {leads.length} registros persistidos en local
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white hover:bg-white/10 transition-all p-2 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-neutral-50 dark:bg-neutral-950/50">
              {leads.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                  <Users className="w-16 h-16 text-neutral-300 dark:text-neutral-700 mb-4" />
                  <p className="text-neutral-500 dark:text-neutral-400 font-headline font-medium">
                    No hay leads registrados todavía
                  </p>
                  <p className="text-neutral-400 dark:text-neutral-500 text-sm mt-1">
                    Los nuevos registros aparecerán aquí automáticamente.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <motion.div
                      key={lead.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start justify-between gap-4"
                    >
                      <div className="space-y-3 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-bold text-neutral-900 dark:text-neutral-100 font-headline truncate">
                            {lead.fullName}
                          </p>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 font-bold uppercase tracking-wider shrink-0">
                            ID: {lead.id.slice(0, 4)}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-label flex items-center gap-1 before:content-['•'] before:mr-1 before:text-neutral-300 dark:before:text-neutral-600 shrink-0">
                            {formatDateLong(lead.createdAt)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm font-body">
                          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                            <Mail className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                            <span className="truncate">
                              {lead.email}
                            </span>
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                              <Phone className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                              <span className="truncate">{lead.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 sm:col-span-2">
                            <Calendar className="w-3.5 h-3.5 text-secondary-500 shrink-0" />
                            <span className="font-medium shrink-0">Evento: </span>
                            <span className="text-neutral-800 dark:text-neutral-200 truncate">
                              {lead.eventTitle}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLead(lead.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0 -mt-1.5 -mr-1.5"
                        title="Eliminar registro"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearLeads}
                disabled={leads.length === 0}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Limpiar todo
              </Button>
              <Button variant="primary" size="sm" onClick={onClose}>
                Cerrar
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
