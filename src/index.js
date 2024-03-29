import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Main from './page/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main />} />
    </Routes>
  </BrowserRouter>
);
