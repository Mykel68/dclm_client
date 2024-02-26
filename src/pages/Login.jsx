import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Image from '../assets/dlbc.png';

const Login = () => {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, formData);

      if (response.data.token) {
        // Save token to localStorage or cookies for future requests
        localStorage.setItem('token', response.data.token);
        // Use navigate to redirect to the '/report' route
        navigate('/report');
      } else {
        // Handle login failure (show error message, etc.)
        setLoginError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" className='bg-light '>
      <Box 
        borderRadius={"10px"}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '30px',
        }}
      >
        <img src={Image} alt="" style={{ width: '40px' }} />
        <Typography component="h1" variant="h5">
          DCLM Admin
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          {loginError && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {loginError}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
