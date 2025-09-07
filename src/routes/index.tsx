import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtextedRoute";
import React from "react";

// 使用懒加载
const Home = React.lazy(() => import("@/pages/Home"));
const About = React.lazy(() => import("@/pages/About"));
const Login = React.lazy(() => import("@/pages/Login"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
