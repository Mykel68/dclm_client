// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://q61zr44g-5001.uks1.devtunnels.ms/auth/login', formData);
      if (response.data.success) {
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
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <h1 className="text-center fw-bold">Login Page</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <button type="button" className="btn btn-success" onClick={handleLogin}>
              Login
            </button>
          </div>
          {loginError && <div className="text-danger mt-2">{loginError}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
