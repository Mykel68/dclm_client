import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import Image from "../assets/dlbc.png";
import KeyIcon from "@mui/icons-material/Key";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        formData
      );

      // Display success message
      toast.success("Registration successful! Redirecting to login...");

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);

      // Display error message
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Box
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
        Register
      </Typography>
      <form onSubmit={handleSubmit} className="bg-light p-4 mt-2 w-25">
        {/* <Box sx={{ "& > :not(style)": { m: 1 } }}> */}
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="standard"
            onChange={handleChange}
            value={formData.name}
            type="text"
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="standard"
            type="email"
            onChange={handleChange}
            value={formData.email}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="standard"
            type="password"
            onChange={handleChange}
            value={formData.password}
          />
        </Box>
        {/* </Box> */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-3 w-100 opacity-75"
        >
          Register
        </Button>
        <Typography className="mt-3">
          Already an Admin? <Link to="/login">Login</Link>
        </Typography>
      </form>

      {/* Toast container to display messages */}
      <ToastContainer position="top-right" autoClose={5000} />
    </Box>
  );
};

export default Register;
