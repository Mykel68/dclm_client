import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useUserToken = () => {
  let userType;
  let userSection;

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    userType = decodedToken.userType;
    userSection = decodedToken.section;
  } else {
    navigate("/login");
  }
  if (userType !== "Super Admin") {
    navigate("/admin");
  }

  return { userType, userSection };
};

export default useUserToken;
