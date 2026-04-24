import { useAuth } from "@/hooks/useAuth";
import NotFoundPage from "@/pages/error/NotFoundPage";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}
export default function ProtectedRoute({ children, adminOnly }: Readonly<ProtectedRouteProps>) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <NotFoundPage/>;
  }

  return <>{children}</>;
}
