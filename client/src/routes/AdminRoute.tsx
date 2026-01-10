import { Navigate } from "react-router-dom";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.isAdmin !== true) {
    return <Navigate to="/foods" replace />;
  }

  return <>{children}</>;
}
