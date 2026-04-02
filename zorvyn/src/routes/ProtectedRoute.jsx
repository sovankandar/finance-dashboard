import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectIsAuthenticated } from '../features/roles/selectors';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthed = useAppSelector(selectIsAuthenticated);

  if (!isAuthed) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
