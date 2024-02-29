import "./App.css";
import React, { useState } from "react";
import ReportForm from "./pages/ReportForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import ReportPage from "./pages/ReportPage";
// Add these lines in your JavaScript file
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import Edit from './pages/Edit';
import Login from "./pages/Login";
import EditReportPage from "./pages/EditReportPage";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReportForm />} />
        <Route
          path="/report"
          element={
            <PrivateRoute component={<ReportPage />} isLoggedIn={isLoggedIn} />
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/edit/:id" element={<EditReportPage />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
