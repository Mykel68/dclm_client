import './App.css';
import ReportForm from './pages/ReportForm';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminPage from './pages/AdminPage';
import ReportPage from './pages/ReportPage';
// Add these lines in your JavaScript file
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function ProtectedRoute({ children }) {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReportForm />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
