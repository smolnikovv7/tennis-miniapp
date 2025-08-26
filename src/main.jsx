import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import AppLayout from '@/layouts/AppLayout.jsx'
import HomePage from '@/pages/HomePage.jsx'
import PartnersPage from '@/pages/PartnersPage.jsx' // фикс: импортим то, что используем

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'partners', element: <PartnersPage /> }, // фикс: используем импортированный компонент
      { path: 'courts', element: <div /> },
      { path: 'matches', element: <div /> },
      { path: 'profile', element: <div /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
