import './i18n.js'; 
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {ContextProvider} from './context/ContextProvider.jsx'
import {Toaster} from "react-hot-toast";



ReactDOM.createRoot(document.getElementById("root")).render(
   
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </>
  
);
