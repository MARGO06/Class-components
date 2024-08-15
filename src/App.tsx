import { Router } from 'src/components/router/Router';
import 'src/App.css';
import { Provider } from 'react-redux';
import { store } from 'src/store/index';
import { ThemeProvider } from './hooks/ThemeContext';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
