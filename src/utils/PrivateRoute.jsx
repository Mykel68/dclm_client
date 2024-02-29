import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return isLoggedIn ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace state={{ from: rest?.location?.pathname }} />
  );
};

export default PrivateRoute;
