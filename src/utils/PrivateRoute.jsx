import React, { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("isLoggedIn:", isLoggedIn);

  useEffect(() => {
    // Check login status (retrieve token from localStorage, check authentication, etc.)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/login" replace state={{ from: rest?.location?.pathname }} />
  );
};

export default PrivateRoute;
