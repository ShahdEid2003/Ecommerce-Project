import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout.jsx'
import DashLayout from './layouts/DasboardLayout.jsx'
import Login from './pages/user/login/Login.jsx'
import Register from './pages/user/register/Register.jsx'
import { ToastContainer } from'react-toastify'
export default function App() {
  const router= createBrowserRouter(
    [
   
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          { path: 'register', element: <Register /> },
          { path: 'login', element: <Login /> },
        ],
      
      },
      {
        path: '/dashboard',
        element: <DashLayout />,
       
      }
    ]
  )
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}/>
    </>
  )
}
