import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import AppLayout from '@/layouts/AppLayout.jsx'
import HomePage from '@/pages/HomePage.jsx'
import PlayersPage from '@/pages/PlayersPage.jsx' // добавлено

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'partners', element: <PlayersPage /> }, // заменено
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
