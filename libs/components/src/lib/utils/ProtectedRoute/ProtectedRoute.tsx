import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/* eslint-disable-next-line */
export interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath: string;
  children?: ReactNode;
}

export function ProtectedRoute(props: ProtectedRouteProps) {
  const { isAllowed, redirectPath, children } = props;
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
