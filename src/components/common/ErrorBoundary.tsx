'use client';

import { Component, ErrorInfo, PropsWithChildren } from 'react';
import { AlertCircle } from 'lucide-react';

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <AlertCircle className="w-5 h-5" />
            <h2 className="font-semibold">Something went wrong</h2>
          </div>
          <p className="text-red-700">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}