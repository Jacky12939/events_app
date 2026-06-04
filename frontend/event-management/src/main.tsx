import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext.tsx';
// 1. Importez votre ThemeProvider (ajustez le chemin selon votre projet)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 2. Enveloppez TOUTE l'application ici */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);