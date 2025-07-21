// components/ErrorBoundary.tsx
import React, { Component } from "react";
import type { ReactNode } from "react";
import ErrorPage from "./ErrorPage";
import * as Sentry from "@sentry/react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  console.error("ErrorBoundary caught an error:", error, errorInfo);
  Sentry.captureException(error);
}

  render() {
    if (this.state.hasError) {
      return <ErrorPage title="Something went wrong" message="An unexpected error occurred. Please return to the home page." />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
