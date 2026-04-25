import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="mb-4">
        <Icon className="w-16 h-16 text-neutral-600 dark:text-neutral-400" strokeWidth={1.5} />
      </div>

      <div className="text-center max-w-md">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2 font-headline">
          {title}
        </h3>
        <p className="text-neutral-700 dark:text-neutral-300 font-body">
          {description}
        </p>
        
        {action && (
          <div className="flex justify-center mt-6">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};
