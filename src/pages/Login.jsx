import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Image from "../assets/dlbc.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  axios.defaults.withCredentials = true;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        formData,
        { withCredentials: false }
      );
      const token = response.data.token;
      localStorage.setItem("token", response.data.token);

      // Redirect based on user role
      const decodedToken = jwtDecode(response.data.token);

      console.log(decodedToken);
      if (decodedToken.userType === "Admin") {
        navigate("/admin");
      } else if (decodedToken.userType === "Super admin") {
        navigate("/super_admin");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized access, handle accordingly
        toast.error("Unauthorized access. Please check your credentials.", {
          position: "top-right",
        });
      } else {
        // Other errors, log the details
        console.error("Error:", error);
      }
    }
  };

  return (
    <Box
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        backgroundColor: "blue",
        width: "100vw",
        height: "100vh",
      }}
    >
      <img src={Image} alt="" style={{ width: "50px" }} />
      <Typography component="h1" variant="h5">
        DCLM Admin
      </Typography>
      <form className="bg-light p-4 m-2 w-25" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="success"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </form>
      <ToastContainer position="top-right" autoClose={5000} />
    </Box>
  );
};

export default Login;
