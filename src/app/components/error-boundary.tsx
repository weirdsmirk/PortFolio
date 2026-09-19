import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("Uncaught error:", error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-[clamp(3rem,8vw,5rem)] leading-none tracking-tight">
            Something went wrong.
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-neutral-500">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="group mt-10 inline-flex items-center gap-2 font-serif text-[1.25rem] text-neutral-50 transition-colors hover:text-neutral-400"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
