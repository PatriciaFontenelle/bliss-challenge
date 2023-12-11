import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './Routes.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode was commented to prevent it from double rendering the app on development mode.
  // <React.StrictMode>
    <AppRoutes />
  // </React.StrictMode>,
)
