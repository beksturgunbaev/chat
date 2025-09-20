import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    return <Navigate to='sign-in' />;
  }

  return <Outlet />;
};

export default PrivateRoute;
