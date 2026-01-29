import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: any) {
    console.error("ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex flex-col items-center justify-center text-center p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-3">
            Something went wrong
          </h2>

          <p className="text-slate-500 mb-6">Please refresh the page</p>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 cursor-pointer bg-violet-600 text-white rounded-lg"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
