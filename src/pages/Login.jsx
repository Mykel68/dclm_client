import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Image from "../assets/dlbc.png";

const Login = () => {
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
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        formData
      );

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // Redirect to the dashboard or any other page after successful login
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized access, handle accordingly
        console.error("Unauthorized access. Please check your credentials.");
      } else {
        // Other errors, log the details
        console.error("Error:", error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="bg-light">
      <Box
        borderRadius={"10px"}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <img src={Image} alt="" style={{ width: "40px" }} />
        <Typography component="h1" variant="h5">
          DCLM Admin
        </Typography>
        <form onSubmit={handleSubmit}>
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
      </Box>
    </Container>
  );
};

export default Login;
