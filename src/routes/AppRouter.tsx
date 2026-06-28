import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from '@/layouts/AuthLayout'
import { MainLayout } from '@/layouts/MainLayout'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { HomePage } from '@/pages/dashboard/HomePage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { PrivateRoute } from '@/routes/PrivateRoute'
import { PublicRoute } from '@/routes/PublicRoute'
import { RegisterPage } from '@/pages/auth/RegisterPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        element: <PublicRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              {
                path: 'login',
                element: <LoginPage />,
              },
              {
                path: 'registro',
                element: <RegisterPage />,
              },
            ],
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
