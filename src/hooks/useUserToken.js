import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useUserToken = () => {
  const [userType, setUserType] = useState(null);
  const [userSection, setUserSection] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserType(decodedToken.userType);
        setUserSection(decodedToken.section);
      } else {
        navigate("/login");
      }
    }
  }, []);

  return { userType, userSection };
};

export default useUserToken;
