import { lazy, Suspense } from "react";
import type { ComponentType, ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { MainLayout } from "@/app/layouts/MainLayout";
import { HomePage } from "@/features/home/pages/HomePage";
import { PrivateRoute } from "@/app/router/PrivateRoute";
import { PublicRoute } from "@/app/router/PublicRoute";
import { RouteLoadingState } from "@/app/router/RouteLoadingState";

const AnimeDetailPage = lazyPage(() => import("@/features/anime/pages/AnimeDetailPage"), "AnimeDetailPage");
const AnimeSearchPage = lazyPage(() => import("@/features/anime/pages/AnimeSearchPage"), "AnimeSearchPage");
const DashboardPage = lazyPage(() => import("@/features/dashboard/pages/DashboardPage"), "DashboardPage");
const ForgotPasswordPage = lazyPage(() => import("@/features/auth/pages/ForgotPasswordPage"), "ForgotPasswordPage");
const LibraryPage = lazyPage(() => import("@/features/library/pages/LibraryPage"), "LibraryPage");
const LoginPage = lazyPage(() => import("@/features/auth/pages/LoginPage"), "LoginPage");
const NotFoundPage = lazyPage(() => import("@/shared/pages/NotFoundPage"), "NotFoundPage");
const ProfilePage = lazyPage(() => import("@/features/user/pages/ProfilePage"), "ProfilePage");
const PublicProfilePage = lazyPage(() => import("@/features/user/pages/PublicProfilePage"), "PublicProfilePage");
const RegisterPage = lazyPage(() => import("@/features/auth/pages/RegisterPage"), "RegisterPage");
const ResetPasswordPage = lazyPage(() => import("@/features/auth/pages/ResetPasswordPage"), "ResetPasswordPage");

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
                element: withPageFallback(<LoginPage />),
              },
              {
                path: "registro",
                element: withPageFallback(<RegisterPage />),
              },
              {
                path: "forgot-password",
                element: withPageFallback(<ForgotPasswordPage />),
              },
              {
                path: "reset-password",
                element: withPageFallback(<ResetPasswordPage />),
              },
            ],
          },
        ],
      },
      {
        path: "anime",
        element: withPageFallback(<AnimeSearchPage />),
      },
      {
        path: "anime/:source/:externalId",
        element: withPageFallback(<AnimeDetailPage />),
      },
      {
        path: "u/:username",
        element: withPageFallback(<PublicProfilePage />),
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "dashboard",
            element: withPageFallback(<DashboardPage />),
          },
          {
            path: "profile",
            element: withPageFallback(<ProfilePage />),
          },
          {
            path: "library",
            element: withPageFallback(<LibraryPage />),
          },
        ],
      },
      {
        path: "*",
        element: withPageFallback(<NotFoundPage />),
      },
    ],
  },
]);

function lazyPage<TModule extends Record<string, ComponentType>>(
  loader: () => Promise<TModule>,
  exportName: keyof TModule,
) {
  return lazy(async () => {
    const module = await loader();

    return { default: module[exportName] };
  });
}

function withPageFallback(page: ReactNode) {
  return <Suspense fallback={<RouteLoadingState />}>{page}</Suspense>;
}
