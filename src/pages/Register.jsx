import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import Image from "../assets/dlbc.png";
import KeyIcon from "@mui/icons-material/Key";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack } from "@mui/material";
import WorkspacesIcon from "@mui/icons-material/Workspaces";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    section: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await axios.post(
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
        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 1 }}>
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

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-label">Section</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="section"
              name="section"
              value={formData.section}
              label="Section"
              onChange={handleChange}
            >
              <MenuItem value="Zoom and Playback">Zoom and Playback</MenuItem>
              <MenuItem value="Teleprompting">Teleprompting</MenuItem>
              <MenuItem value="Video">Video</MenuItem>
              <MenuItem value="Audio">Audio</MenuItem>
              <MenuItem value="Streaming">Streaming</MenuItem>
              <MenuItem value="Uplink">Uplink</MenuItem>
              <MenuItem value="Graphics">Graphics</MenuItem>
              <MenuItem value="Super admin">Super admin</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-3 w-100 opacity-75"
        >
          Register
        </Button>
      </form>

      <ToastContainer position="top-right" autoClose={5000} />
    </Box>
  );
};

export default Register;
