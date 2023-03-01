import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Detail from './pages/Detail';
import Auth from './pages/Auth';
import Create from './pages/Create';
import List from './pages/List';
import DashBoard from './pages/DashBoard';
import Update from './pages/Update';
import Create2 from './pages/Create2';



const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children: [
      {
        path: "/",
        element: (
        <DashBoard />
        ),
      },
      {
        path: ":id",
        element: (
        <Detail />
        ),
      },
      {
        path: "create-invoice",
        element: (
        <Create />
        ),
      },
      // {
      //   path: "create-invoice",
      //   element: (
      //   <Create2 />
      //   ),
      // },
      {
        path: "invoices-list",
        element: (
        <List />
        ),
      },
      {
        path: "update-invoice/:id",
        element: (
        <Update />
        ),
      }
    ],
  },
  {
    path: "/connexion",
    element:<Auth/>,
  }
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


