import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [userSection, setUserSection] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.userType);
      setUserSection(decodedToken.section);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <UserContext.Provider value={{ userType, userSection }}>
      {children}
    </UserContext.Provider>
  );
};
