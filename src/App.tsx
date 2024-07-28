import { router } from 'src/components/router/Router';
import { RouterProvider } from 'react-router-dom';
import 'src/App.css';
import { Provider } from 'react-redux';
import { store } from 'src/store/index';
import { ThemeProvider } from './hooks/ThemeContext';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
