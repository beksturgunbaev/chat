import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const user = false;

  if (!user) {
    return <Navigate to='sign-in' />;
  }
  return <Outlet />;
};

export default PrivateRoute;
