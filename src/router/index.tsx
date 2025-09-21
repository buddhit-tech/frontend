import { createBrowserRouter, Outlet } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import { Suspense, lazy } from "react";

const Login = lazy(() => import("../pages/Auth/Login"));
const DashboardHome = lazy(() => import("../pages/Dashboard/Home"));
const NotFound = lazy(() => import("../pages/Utils/NotFound"));
const Profile = lazy(() => import("../pages/Dashboard/Profile"));
const Discover = lazy(() => import("../pages/Dashboard/Discover"));
const BlogDetail = lazy(() => import("../pages/Dashboard/BlogDetail"));

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Outlet />
    </div>
  );
}

function DashboardLayout() {
  // const { isLoggedIn } = useAuth();

  // if (!isLoggedIn) {
  //   return <Navigate to="/auth/login" />;
  // }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardHome />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "discover",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Discover />
          </Suspense>
        ),
      },
      {
        path: "discover/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BlogDetail />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default router;
