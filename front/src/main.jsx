import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Pay from './Pay.jsx';
// import Success from './Success.jsx';
import Cancel from './cancel.jsx';
import Success from './success.jsx';




const router = createBrowserRouter([
  
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cancel",
    element: <Cancel />,
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