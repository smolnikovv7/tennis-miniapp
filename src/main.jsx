import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import AppLayout from '@/layouts/AppLayout.jsx'
import HomePage from '@/pages/HomePage.jsx'
import PartnersPage from '@/pages/PartnersPage.jsx'
import CourtsPage from '@/pages/CourtsPage.jsx'
import MatchesPage from '@/pages/MatchesPage.jsx'
import ProfilePage from '@/pages/ProfilePage.jsx'
import BookingPage from '@/pages/BookingPage.jsx'
import SignInPage from '@/pages/SignInPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'partners', element: <PartnersPage /> },
      { path: 'courts', element: <CourtsPage /> },
      { path: 'matches', element: <MatchesPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'booking', element: <BookingPage /> },
      { path: 'signin', element: <SignInPage /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
