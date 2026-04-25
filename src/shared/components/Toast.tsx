import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-600 dark:bg-green-700',
      textColor: 'text-white',
      borderColor: 'border-l-4 border-green-700 dark:border-green-800',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-600 dark:bg-red-700',
      textColor: 'text-white',
      borderColor: 'border-l-4 border-red-700 dark:border-red-800',
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-secondary-500 dark:bg-secondary-600',
      textColor: 'text-neutral-900 dark:text-neutral-900',
      borderColor: 'border-l-4 border-secondary-700 dark:border-secondary-800',
    },
    info: {
      icon: Info,
      bgColor: 'bg-primary dark:bg-primary',
      textColor: 'text-white',
      borderColor: 'border-l-4 border-primary-700 dark:border-primary-800',
    },
  };

  const { icon: Icon, bgColor, textColor, borderColor } = config[type];

  return (
    <motion.div 
      role="alert"
      className={`fixed top-4 right-4 ${bgColor} ${textColor} ${borderColor} px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 min-w-[300px] max-w-md`}
      initial={{ opacity: 0, x: 100, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="font-medium flex-1 font-body">{message}</span>
      <button 
        onClick={onClose} 
        className="ml-2 hover:opacity-80 transition-opacity flex-shrink-0"
        aria-label="Cerrar notificación"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
