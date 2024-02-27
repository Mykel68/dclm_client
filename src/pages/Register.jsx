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
      console.log(
        "Sending request to:",
        `${process.env.REACT_APP_BASE_URL}/auth/register`
      );

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/register`,
        formData
      );

      console.log("Response data:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);

      // Log more details about the error
      if (error.response) {
        console.error(
          "Server responded with non-2xx status:",
          error.response.status
        );
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  return (
    <Container
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
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
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
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-3"
        >
          Register
        </Button>
      </form>
      <Typography>
        Already an Admin? <Link to="/login">Login</Link>
      </Typography>
    </Container>
  );
};

export default Register;
