import React from 'react';
import ReactDOM from 'react-dom/client';
import { Slide, ToastContainer } from 'react-toastify';
import App from './App.tsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ToastContainer
      autoClose={5000}
      theme="colored"
      pauseOnHover
      transition={Slide}
    />
  </React.StrictMode>,
);
