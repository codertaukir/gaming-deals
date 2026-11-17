interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div aria-hidden="true" className={`skeleton-shimmer rounded-[8px] ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="surface-card flex flex-col gap-4 p-4" aria-hidden="true">
      <Skeleton className="aspect-[16/10] w-full rounded-[8px]" />
      <div className="space-y-2.5">
        <Skeleton className="h-3.5 w-1/3" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
