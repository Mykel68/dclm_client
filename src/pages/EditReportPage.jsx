// EditReportPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditReportPage = () => {
  const { id } = useParams();
  const [report, setReport] = useState({});

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/edit-report/${id}`);
        if (response.status === 200) {
          setReport(response.data);
        } else {
          console.error('Error fetching report');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReport();
  }, [id]);

  // Implement your form handling logic for editing the report here

  return (
    <div>
      <h2>Edit Report</h2>
      <form>
        
      </form>
    </div>
  );
};

export default EditReportPage;
