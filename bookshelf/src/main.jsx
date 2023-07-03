import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.jsx'
import ErrorPage from './error-page.jsx'
import './index.css'
import AddDetailsPage from './AddDetailsPage.jsx'
import ViewDetails from './ViewDetails.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/add-details/:id',
    element: <AddDetailsPage />,
  },
  {
    path: '/view-details/:id',
    element: <ViewDetails />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
