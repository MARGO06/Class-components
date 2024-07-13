import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from 'src/views/mainPage/MainPage';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="RS-School_React/" element={<MainPage />} />
        <Route path="search/:search/page/:pageNumber" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};
