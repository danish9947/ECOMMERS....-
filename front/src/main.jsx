import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Success from './Success.jsx';
import Pay from './Pay.jsx';
import Form from './Form.jsx';



const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Form />,
  // },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pay",
    element: <Pay />,
  },
  {
    path: "/success",
    element: <Success />,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);