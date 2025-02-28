import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#013220] text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-red-400">
              Something went wrong.
            </h1>
            <p className="text-lg">
              {this.state.error.message || "Please try refreshing the page."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 border border-white rounded-lg text-white bg-[#013220] hover:bg-white hover:text-[#013220] transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;