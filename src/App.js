import "./App.css";
import React from "react";
import ReportForm from "./pages/auth/super_admin/report/ReportForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./pages/auth/admin/Index";
import SuperAdminPage from "./pages/auth/super_admin/Index";
import ReportPage from "./pages/auth/super_admin/report/ReportPage";
// Add these lines in your JavaScript file
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import Edit from './pages/Edit';
import Login from "./pages/Login";
import EditReportPage from "./pages/auth/super_admin/report/EditReportPage";
import NewReportPage from "./pages/auth/super_admin/report/NewReportPage";
import AddAdmin from "./pages/auth/super_admin/admin/AddAdmin";
import AllAdmin from "./pages/auth/super_admin/admin/AllAdmin";
import Index from "./pages/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/edit/:id" element={<EditReportPage />} />
        <Route path="/new" element={<NewReportPage />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/all_admin" element={<AllAdmin />} />
        <Route path="/new_admin" element={<AddAdmin />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/super_admin" element={<SuperAdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
