// import "./App.css";
// import React, { useState } from "react";
// import ReportForm from "./pages/ReportForm";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import AdminPage from "./pages/AdminPage";
// import ReportPage from "./pages/ReportPage";
// // Add these lines in your JavaScript file
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// // import Edit from './pages/Edit';
// import Login from "./pages/Login";
// import EditReportPage from "./pages/EditReportPage";
// import Register from "./pages/Register";
// import PrivateRoute from "./utils/PrivateRoute";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<ReportForm />} />
//         <Route
//           path="/report"
//           element={
//             <PrivateRoute component={<ReportPage />} isLoggedIn={isLoggedIn} />
//           }
//         />
//         <Route path="/admin" element={<AdminPage />} />
//         <Route path="/edit/:id" element={<EditReportPage />} />
//         <Route
//           path="/login"
//           element={<Login setIsLoggedIn={setIsLoggedIn} />}
//         />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// 👆👆👆👆👆👆👆👆
// Working on authenicating user can't view admin page with url and bypassing login

import "./App.css";
import React, { useState } from "react";
import ReportForm from "./pages/auth/super_admin/report/ReportForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./pages/auth/super_admin/report/AdminPage";
import ReportPage from "./pages/auth/super_admin/report/ReportPage";
// Add these lines in your JavaScript file
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import Edit from './pages/Edit';
import Login from "./pages/Login";
import EditReportPage from "./pages/auth/super_admin/report/EditReportPage";
import NewReportPage from "./pages/auth/super_admin/report/NewReportPage";
import Register from "./pages/Register";
import AddAdmin from "./pages/auth/super_admin/admin/AddAdmin";
import AllAdmin from "./pages/auth/super_admin/admin/AllAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReportForm />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/edit/:id" element={<EditReportPage />} />
        <Route path="/new" element={<NewReportPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all_admin" element={<AllAdmin />} />
        <Route path="/new_admin" element={<AddAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
