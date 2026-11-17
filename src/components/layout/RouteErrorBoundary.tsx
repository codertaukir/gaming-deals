import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Container, ErrorState } from '@/components/ui';

interface RouteErrorBoundaryProps {
  children: ReactNode;
}

interface RouteErrorBoundaryState {
  hasError: boolean;
  isModuleError: boolean;
}

export class RouteErrorBoundary extends Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  state: RouteErrorBoundaryState = { hasError: false, isModuleError: false };

  static getDerivedStateFromError(error: Error): RouteErrorBoundaryState {
    const message = error?.message ?? '';
    const isModuleError =
      message.includes('dynamically imported module') ||
      message.includes('Failed to fetch') ||
      message.includes('ChunkLoadError');
    return { hasError: true, isModuleError };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Route render error:', error, info);
  }

  handleRetry = () => {
    if (this.state.isModuleError) {
      window.location.reload();
      return;
    }
    this.setState({ hasError: false, isModuleError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container className="py-16">
          <ErrorState
            title="Something went wrong loading this view"
            description="An unexpected rendering error occurred. You can retry loading the view or return to the homepage."
            retryLabel="Reload view"
            onRetry={this.handleRetry}
          />
        </Container>
      );
    }

    return this.props.children;
  }
}
