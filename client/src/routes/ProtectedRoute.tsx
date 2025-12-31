// import { Navigate } from "react-router-dom";
// import { isAuthenticated } from "@/utils/auth";
// import type { JSX } from "react";

// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
