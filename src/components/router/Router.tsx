import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from 'src/views/mainPage/MainPage';
import { Header } from 'src/components/header/Header';
import { UncontrolledForm } from 'src/views/uncontrolledForm/UncontrolledPage';
import { ReactHookForm } from 'src/views/reactHookForm/ReactHookForm';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/RS-School_React" element={<MainPage />} />
        <Route path="/RS-School_React/uncontrolled_page" element={<UncontrolledForm />} />
        <Route path="/RS-School_React/react_hook_form" element={<ReactHookForm />} />
      </Routes>
    </BrowserRouter>
  );
};
