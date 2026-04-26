import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, CirclePlus} from 'lucide-react';
import { motion } from 'framer-motion';
import type { Event } from '@/features/events/types';
import { leadFormSchema, type LeadFormData } from '@/shared/schemas/leadSchema';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';

interface LeadFormProps {
  event: Event;
  onSubmit: (data: LeadFormData) => void;
  onClose: () => void;
}

export const LeadForm = ({ event, onSubmit, onClose }: LeadFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      eventId: event.id,
      eventTitle: event.title,
    },
  });

  const onFormSubmit = (data: LeadFormData) => {
    onSubmit(data);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-white dark:bg-neutral-900 rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{
          duration: 0.3,
          type: "spring",
          damping: 25,
          stiffness: 300,
        }}
      >
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex flex-col h-full"
        >
          <div className="bg-primary dark:bg-primary text-white px-6 py-5 flex justify-between items-center rounded-t-lg border-b-4 border-secondary-500 flex-shrink-0">
            <div>
              <h2 className="text-2xl font-headline font-bold">
                Registrar Interesado
              </h2>
              <p className="text-primary-100 dark:text-primary-200 text-sm mt-1 font-body">
                Complete el formulario para registrar
              </p>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="text-white/80 hover:text-white hover:bg-white/10 transition-all p-2 rounded-lg"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-6 overflow-y-auto flex-1 ">
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-6 shadow-md dark:shadow-lg dark:shadow-black/20">
              <p className="text-xs font-semibold font-label text-primary-600 dark:text-primary-400 mb-1.5 uppercase tracking-wide">
                Evento seleccionado
              </p>
              <p className="text-base font-bold font-headline text-primary-700 dark:text-primary-300">
                {event.title}
              </p>
            </div>

            <div className="space-y-5">
              <Input
                label="Nombre Completo"
                type="text"
                placeholder="Juan Pérez"
                error={errors.fullName?.message}
                disabled={isSubmitting}
                required
                {...register("fullName")}
              />

              <Input
                label="Email"
                type="email"
                placeholder="carlos-reyes@javeriana.edu.co"
                error={errors.email?.message}
                helperText="Debe ser un correo institucional @javeriana.edu.co"
                disabled={isSubmitting}
                required
                {...register("email")}
              />
 
              <Input
                label="Teléfono (Opcional)"
                type="tel"
                placeholder="+57 300 123 4567"
                error={errors.phone?.message}
                helperText="Entre 7 y 15 caracteres"
                disabled={isSubmitting}
                {...register("phone")}
              />


            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 flex gap-3 px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 flex-shrink-0">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
              fullWidth
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={<CirclePlus className="w-4 h-4" />}
              isLoading={isSubmitting}
              fullWidth
            >
              {isSubmitting ? "Registrando..." : "Registrar Lead"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
