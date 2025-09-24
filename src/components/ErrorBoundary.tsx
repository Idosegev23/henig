'use client'

import React from 'react'
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent 
          error={this.state.error} 
          retry={() => this.setState({ hasError: false, error: undefined })} 
        />
      )
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error?: Error
  retry: () => void
}

function DefaultErrorFallback({ error, retry }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            אופס! משהו השתבש
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            אירעה שגיאה לא צפויה. אנא נסו שוב מאוחר יותר.
          </p>
          {error && process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                פרטי השגיאה (מוצג רק בפיתוח)
              </summary>
              <pre className="mt-2 text-xs text-red-600 bg-red-50 p-4 rounded-lg overflow-auto">
                {error.message}
                {error.stack && (
                  <>
                    {'\n\n'}
                    {error.stack}
                  </>
                )}
              </pre>
            </details>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <button
            onClick={retry}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <ArrowPathIcon className="w-5 h-5 ml-2" />
            נסה שוב
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            חזור לעמוד הבית
          </button>
        </div>
      </div>
    </div>
  )
}

// Error boundary hook for functional components
export function useErrorHandler() {
  return (error: Error) => {
    console.error('Caught error:', error)
    // You can integrate with error reporting services here
    // like Sentry, LogRocket, etc.
  }
}

// Async error boundary for handling async errors
export function AsyncErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={AsyncErrorFallback}>
      {children}
    </ErrorBoundary>
  )
}

function AsyncErrorFallback({ error, retry }: ErrorFallbackProps) {
  return (
    <div className="text-center py-16">
      <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        שגיאה בטעינת הנתונים
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        לא הצלחנו לטעון את הנתונים. אנא בדקו את החיבור לאינטרנט ונסו שוב.
      </p>
      <div className="mt-6">
        <button
          onClick={retry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <ArrowPathIcon className="w-4 h-4 ml-2" />
          נסה שוב
        </button>
      </div>
    </div>
  )
}
