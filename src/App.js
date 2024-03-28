import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
import ReportForm from "./pages/auth/super_admin/report/ReportForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SuperAdminPage from "./pages/auth/super_admin/Index";
import AdminPage from "./pages/auth/admin/Index";
import SuperAdminReportForm from "./pages/auth/super_admin/report/ReportForm";
import AdminReportForm from "./pages/auth/admin/report/ReportForm";
import SuperAdminReportPage from "./pages/auth/super_admin/report/ReportPage";
import AdminReportPage from "./pages/auth/admin/report/ReportPage";
// import Edit from './pages/Edit';
import EditReportPage from "./pages/auth/super_admin/report/EditReportPage";
import AddAdmin from "./pages/auth/super_admin/admin/AddAdmin";
import AllAdmin from "./pages/auth/super_admin/admin/AllAdmin";
import Index from "./pages/Index";
import NoPage from "./pages/Nopage";
import Profile from "./pages/auth/profile/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/super_report_page" element={<SuperAdminReportPage />} />
        <Route path="/admin_report_page" element={<AdminReportPage />} />
        <Route path="/edit/:id" element={<EditReportPage />} />
        <Route path="/new_report" element={<AdminReportForm />} />
        <Route path="/super_report" element={<SuperAdminReportForm />} />
        <Route path="/login" element={<Login />} />

        <Route path="/all_admin" element={<AllAdmin />} />
        <Route path="/new_admin" element={<AddAdmin />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/super_admin" element={<SuperAdminPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
