import 'src/index.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'src/store/index';
import { ThemeProvider } from 'src/hooks/ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
