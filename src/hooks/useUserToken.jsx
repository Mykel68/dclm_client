import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useUserToken = () => {
  const [userType, setUserType] = useState();
  const [userSection, setUserSection] = useState();

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
  }, []);

  return { userType, userSection };
};

export default useUserToken;
