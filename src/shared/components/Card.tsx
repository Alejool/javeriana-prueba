import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  variant?: 'default' | 'outlined' | 'elevated';
}

export const Card = ({ 
  children, 
  className = '', 
  onClick, 
  hover = false,
  variant = 'default' 
}: CardProps) => {
  const baseStyles = 'bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800';
  
  const variants = {
    default: 'shadow-sm dark:shadow-lg dark:shadow-black/30',
    outlined: 'border border-neutral-200 dark:border-neutral-700',
    elevated: 'shadow-md dark:shadow-xl dark:shadow-black/40',
  };
  
  const hoverStyles = hover ? 'hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-900/50 transition-all duration-300' : '';
  const clickableStyles = onClick ? 'cursor-pointer' : '';

  return (
    <article
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </article>
  );
};
