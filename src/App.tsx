import Navbar from './components/Navbar'
import { RouterProvider } from 'react-router-dom';
import { routes } from './pages/routes';
import Header from './components/header/Header'

export default function App() {
  return (
    <>
      <Header />
      <Navbar/>
      <RouterProvider router={routes} />
    </>
  )
}
