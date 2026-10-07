"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[100dvh] flex items-center justify-center bg-canvas text-foreground p-8">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">
              We encountered an unexpected error. Refreshing usually fixes it.
              If it does not, the rest of the site still works.
            </p>
            {/* This boundary wraps the header and footer as well as the page,
                so when it triggers the visitor has no navigation at all — and
                if the error is deterministic, "Refresh" loops them straight
                back here. A plain anchor to "/" is deliberate: it forces a
                full document load instead of a client-side route change,
                which is the more reliable escape from a broken client state. */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-hp-electric hover:bg-hp-deep active:scale-[0.97] text-white px-6 py-3 rounded-lg font-medium transition-[background-color,transform] duration-150"
              >
                Refresh Page
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center border border-ink/20 hover:bg-ink/5 active:scale-[0.97] text-ink px-6 py-3 rounded-lg font-medium transition-[background-color,transform] duration-150"
              >
                Return Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
