import { CardSkeleton, Container, Skeleton } from '@/components/ui';

export function PageLoader() {
  return (
    <Container className="py-12">
      <div className="space-y-8" aria-busy="true" aria-label="Loading page content">
        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-2/3 max-w-lg" />
          <Skeleton className="h-4 w-1/2 max-w-md" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </Container>
  );
}
