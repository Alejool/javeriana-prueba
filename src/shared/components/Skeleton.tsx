interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = '' }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded ${className}`}
      aria-hidden="true"
    />
  );
};

export const SkeletonShimmer = ({ className = '' }: SkeletonProps) => {
  return (
    <div
      className={`relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 rounded ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
    </div>
  );
};
