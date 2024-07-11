import { Component } from 'react';
import style from 'src/components/error/ErrorBoundary.module.scss';
import { Text } from 'src/components/text/Text';
import { Button } from 'src/components/button/Button';

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
        <div className={style.error}>
          <Text tag="h1" className={style.error_text} title="Something wrong" />
          <p className={style.error_text}>Let`s try to reload page</p>
          <Button
            className={style.button_reload}
            onClick={() => {
              window.location.reload();
            }}
            title="Reload"
          />
        </div>
      );
    }
    return children;
  }
}
