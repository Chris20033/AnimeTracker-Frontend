import { createBrowserRouter } from "react-router-dom";
import { AnimeDetailPage } from "@/features/anime/pages/AnimeDetailPage";
import { AnimeSearchPage } from "@/features/anime/pages/AnimeSearchPage";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { MainLayout } from "@/app/layouts/MainLayout";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";
import { HomePage } from "@/features/home/pages/HomePage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { NotFoundPage } from "@/shared/pages/NotFoundPage";
import { PrivateRoute } from "@/app/router/PrivateRoute";
import { ProfilePage } from "@/features/user/pages/ProfilePage";
import { PublicProfilePage } from "@/features/user/pages/PublicProfilePage";
import { PublicRoute } from "@/app/router/PublicRoute";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { ResetPasswordPage } from "@/features/auth/pages/ResetPasswordPage";

export const router = createBrowserRouter([
  {
    path: "/",
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
                path: "login",
                element: <LoginPage />,
              },
              {
                path: "registro",
                element: <RegisterPage />,
              },
              {
                path: "forgot-password",
                element: <ForgotPasswordPage />,
              },
              {
                path: "reset-password",
                element: <ResetPasswordPage />,
              },
            ],
          },
        ],
      },
      {
        path: "anime",
        element: <AnimeSearchPage />,
      },
      {
        path: "anime/:source/:externalId",
        element: <AnimeDetailPage />,
      },
      {
        path: "u/:username",
        element: <PublicProfilePage />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
