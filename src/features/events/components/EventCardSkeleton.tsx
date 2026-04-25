import { SkeletonShimmer } from '@/shared/components/Skeleton';

export const EventCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <SkeletonShimmer className="h-6 w-24" />
          <SkeletonShimmer className="h-5 w-16 rounded-full" />
        </div>
        
        <SkeletonShimmer className="h-7 w-full mb-2" />
        <SkeletonShimmer className="h-7 w-3/4 mb-4" />
        
        <div className="space-y-2 mb-4">
          <SkeletonShimmer className="h-4 w-full" />
          <SkeletonShimmer className="h-4 w-full" />
          <SkeletonShimmer className="h-4 w-2/3" />
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2">
            <SkeletonShimmer className="h-5 w-5 rounded" />
            <SkeletonShimmer className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <SkeletonShimmer className="h-5 w-5 rounded" />
            <SkeletonShimmer className="h-4 w-40" />
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <SkeletonShimmer className="h-4 w-28" />
          <SkeletonShimmer className="h-4 w-16" />
        </div>
        
        <SkeletonShimmer className="h-2 w-full rounded-full mb-4" />
      </div>
      
      <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-200 dark:border-neutral-700">
        <SkeletonShimmer className="h-11 w-full rounded-lg" />
      </div>
    </div>
  );
};

export const EventsListSkeleton = ({ count = 9 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
};
