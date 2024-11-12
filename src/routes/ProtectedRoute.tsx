import { ReactNode } from 'react';
import { useAuth } from '../customHooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Spinner } from 'hero-shad';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div>
        <Spinner loading />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
