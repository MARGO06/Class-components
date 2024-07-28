import { createBrowserRouter } from 'react-router-dom';
import MainPage from 'src/views/mainPage/MainPage';
import { InformationPage } from 'src/views/informationPage/InformationPage';

export const router = createBrowserRouter([
  {
    path: '/RS-School_React/',
    element: <MainPage />,
    children: [
      {
        path: 'details/:name',
        element: <InformationPage />,
      },
    ],
  },
]);
