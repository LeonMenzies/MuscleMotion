import { ReactNode } from 'react';
import { Navigate, Route } from 'react-router-dom';

export interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath: string;
  path: string;
  element: ReactNode;
}

export function ProtectedRoute(props: ProtectedRouteProps) {
  const { isAllowed, redirectPath, path, element } = props;

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Route path={path} element={element} />;
}

export default ProtectedRoute;
