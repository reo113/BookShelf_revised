import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"; //
import App from './App.jsx'
import BookList,{loader as bookLoader} from "./BookList";
import ErrorPage from './error-page.jsx'
import './index.css'
import BookSearch from './searchForBooks.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
children: [
  {
    path: '/',
    element:<BookList/>,
    loader: bookLoader,
  },
],
  },
  {
    path:'/',
    element: <BookSearch />,
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
