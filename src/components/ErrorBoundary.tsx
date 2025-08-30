import React, { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ZenFlow Error Boundary caught an error:', error, errorInfo);
    
    // Track error in analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: false
      });
    }

    // TODO: Log to Firebase Analytics when configured
    // if (firebase?.analytics) {
    //   firebase.analytics.logEvent('app_error', {
    //     error_message: error.message,
    //     error_stack: error.stack,
    //     component_stack: errorInfo.componentStack
    //   });
    // }
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    console.log('ErrorBoundary: Rendering');
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center p-4">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-destructive/10 w-fit">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle>Something went wrong</CardTitle>
              <CardDescription>
                ZenFlow encountered an unexpected error. Your meditation data is safe.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                <p className="font-medium">Error details:</p>
                <p className="mt-1 font-mono text-xs break-all">
                  {this.state.error?.message || 'Unknown error occurred'}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={this.handleReset} variant="outline" className="flex-1">
                  Try Again
                </Button>
                <Button onClick={this.handleReload} className="flex-1">
                  Reload App
                </Button>
              </div>
              
              <p className="text-xs text-center text-muted-foreground">
                If this problem persists, please restart the app
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}