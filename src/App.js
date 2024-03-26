import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
import ReportForm from "./pages/auth/super_admin/report/ReportForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperAdminPage from "./pages/auth/super_admin/Index";
import AdminPage from "./pages/auth/admin/Index";
import ReportPage from "./pages/auth/super_admin/report/ReportPage";
// import Edit from './pages/Edit';
import Login from "./pages/Login";
import EditReportPage from "./pages/auth/super_admin/report/EditReportPage";
import AdminReportForm from "./pages/auth/admin/report/ReportForm";
import SuperAdminReportForm from "./pages/auth/super_admin/report/ReportForm";
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
        <Route path="/new_report" element={<AdminReportForm />} />
        <Route path="/super_report" element={<SuperAdminReportForm />} />
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
