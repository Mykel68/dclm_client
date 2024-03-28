import React from "react";
import Bar from "../../../../components/Bar";
import Register from "../../../Register";
import { useNavigate } from "react-router-dom";
import useUserToken from "../../../../hooks/useUserToken";
const AddAdmin = () => {
  const { userType } = useUserToken();
  const navigate = useNavigate();
  if (userType !== "Super admin") {
    navigate("/admin");
  }
  return (
    <div>
      <Bar />
      <Register />
    </div>
  );
};

export default AddAdmin;
