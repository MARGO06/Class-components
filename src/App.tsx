import { router } from 'src/components/router/Router';
import { RouterProvider } from 'react-router-dom';
import 'src/App.css';
import { Provider } from 'react-redux';
import { store } from 'src/store/index';

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
