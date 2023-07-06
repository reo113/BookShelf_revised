import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.jsx'
import ErrorPage from './error-page.jsx'
import './index.css'
import AddDetailsPage from './AddDetailsPage.jsx'
import ViewDetails from './viewDetails.jsx';
import DeleteBook from './deleteBook.jsx';
import EditDetails from './editDetails.jsx';
import {loader as editDetailsLoader} from './editDetails.jsx';
import {loader as addDetailsLoader} from './AddDetailsPage.jsx';  

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/add-details/:id',
    element: <AddDetailsPage />,
    loader: addDetailsLoader,
  },
  {
    path: '/view-details/:id',
    element: <ViewDetails />,
  },
  {
    path: '/delete-book/:id',
    element: <DeleteBook />,
  },
  {
    path: 'edit-details/:id',
    element:<EditDetails />,
    loader: editDetailsLoader,
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
