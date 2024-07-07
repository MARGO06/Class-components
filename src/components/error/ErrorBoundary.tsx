import { Component } from 'react';
import './ErrorBoundary.css';

type ErrorBoundaryState = {
  hasError: boolean;
  errorLogged: boolean;
};

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorLogged: false };
  }

  componentDidCatch(error: Error) {
    const { errorLogged } = this.state;
    if (!errorLogged) {
      console.error(error);
      this.setState({ hasError: true, errorLogged: true });
    }
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="error">
          <h1 className="error-text">Something wrong</h1>
          <p className="error-text">Let`s try to reaload page</p>
          <button
            type="button"
            className="button-reload"
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return children;
  }
}
