import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ user }) => {
  const [userType, setUserType] = useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.userType);
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {user}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
