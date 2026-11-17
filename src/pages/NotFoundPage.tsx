import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button, Container, EmptyState } from '@/components/ui';
import { SeoHead } from '@/components/seo/SeoHead';
import { ROUTES } from '@/router/routes';

export function NotFoundPage() {
  return (
    <Container className="py-16 sm:py-24">
      <SeoHead
        title="Page Not Found"
        description="The requested page could not be found on Gaming Deals."
      />
      <EmptyState
        title="Page not found"
        description="The link may have moved or does not exist. Return to the Gaming Deals homepage or browse active deals."
      />
      <div className="mt-6 flex justify-center gap-3">
        <Link to={ROUTES.home}>
          <Button variant="primary" leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}>
            Back to Home
          </Button>
        </Link>
        <Link to={ROUTES.deals}>
          <Button variant="secondary">Browse Deals</Button>
        </Link>
      </div>
    </Container>
  );
}
