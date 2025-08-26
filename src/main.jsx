import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import AppLayout from '@/layouts/AppLayout.jsx'
import HomePage from '@/pages/HomePage.jsx'
import PlayersPage from '@/pages/PlayersPage.jsx'   // <— добавили

// (по желанию)
// import CourtsPage from '@/pages/CourtsPage.jsx'
// import MatchesPage from '@/pages/MatchesPage.jsx'
// import ProfilePage from '@/pages/ProfilePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'players', element: <PlayersPage /> }, // <— маршрут на игроков
      { path: 'partners', element: <div /> },
      { path: 'courts', element: <div /> },
      { path: 'matches', element: <div /> },
      { path: 'profile', element: <div /> },
      // { path: 'courts', element: <CourtsPage /> },
      // { path: 'matches', element: <MatchesPage /> },
      // { path: 'profile', element: <ProfilePage /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
