import React, { StrictMode } from 'react'; // Adicione { StrictMode }
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Transacoes from './pages/Transacoes';
import Relatorios from './pages/Relatorios';
import Settings from './pages/Settings';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/ >,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/transacoes",
        element: <Transacoes />,
      },
      {
        path: "/relatorios",
        element: <Relatorios />,
      },
      { 
        path: "/configuracoes",
        element: <Settings />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
