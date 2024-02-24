import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div>
        <div className="container">
            <h1 className="text-center">Admin Page</h1>
            <Link to="/report">View Report</Link>
        </div>
    </div>
  );
}

export default AdminPage;
