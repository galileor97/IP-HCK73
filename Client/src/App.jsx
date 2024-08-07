import { useState } from 'react'
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import './App.css'
import LoginPage from './pages/LoginPage'
import MainLayout from './pages/MainLayout';
import DashboardPage from './pages/DashboardPage';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />
      },
      {
        path: '*',
        element: <h1>Not Found 404</h1>
      },
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])

function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
