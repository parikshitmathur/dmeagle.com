// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css'; // Sahi path kyunki index.css css folder ke andar hai
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();