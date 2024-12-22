import React from 'react'
import Navbar from './components/Navbar'
import { RouterProvider } from 'react-router-dom';
import { routes } from './pages/routes';

export default function App() {
  return (
    <>
      <Navbar/>
      <RouterProvider router={routes} />
    </>
  )
}
