import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Detail from './pages/invoices/Detail';
import Auth from './pages/public/Auth';
import Create from './pages/invoices/Create';
import List from './pages/invoices/List';
import DashBoard from './pages/invoices/DashBoard';
import DashBoards from './pages/quotes/DashBoard';
import Update from './pages/invoices/Update';
import PageTitle from './components/layout/PageTitle';
import ForgotPassword from './pages/public/ForgotPassword';
import Update2 from './pages/invoices/Update2';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <>
            <PageTitle title='Factures' breadcrumb='Listes des factures' />
            <DashBoard />
          </>
        ),
      },
      {
        path: ':id',
        element: (
          <>
            <PageTitle title='Factures' breadcrumb='Détails' />
            <Detail />
          </>
        ),
      },
      {
        path: 'create-invoice',
        element: (
          <>
          <PageTitle title='Factures' breadcrumb='Création de facture' />
        <Create />
        </>
        )
        ,
      },
      {
        path: 'invoices-list',
        element: <List />,
      },
      {
        path: ':id/update-invoice',
        element:(
          <>
          <PageTitle title='Factures' breadcrumb='Modification de facture' />
          <Update />
          </>
          ),
      },
      {
          path: '/list-devis',
          element: (
            <>
              <PageTitle title='Devis' breadcrumb='Listes des devis' />
              <DashBoards />
            </>
          ),
      },
    ],
  },
  {
    path: '/connexion',
    element: <Auth />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
])





const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();


