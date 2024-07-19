import { router } from 'src/components/router/Router';
import { RouterProvider } from 'react-router-dom';
import 'src/App.css';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
