// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/useAuth"; // 这里假设你用zustand存token
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const token = useAuth((s) => s.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
