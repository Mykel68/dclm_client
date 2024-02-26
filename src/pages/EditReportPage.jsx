import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

const EditReportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState({
    date: '',
    serviceType: '',
    section: '',
    supervisor: '',
    location: '',
  });


  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/edit-report/`+ id);
        // console.log(response.data)
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/update-report/${id}`, report);
      if (response.status === 200) {
        console.log('Report updated successfully');
        // Optionally, redirect the user or perform other actions after successful update
        navigate('/report'); // Navigate to the report page after successful update
      } else {
        console.error('Error updating report');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" gutterBottom>
          Edit Report
        </Typography>
        <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
          <Box sx={{ display: 'grid', gap: 2 }}>
            {/* <TextField
              label="Date"
              variant="outlined"
              name="date"
              value={''}
              defaultValue={`${report.date}`}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              type='date'
              placeholder={`Previous: ${report.date}`}
            /> */}
            <TextField
              label="Service Type"
              variant="outlined"
              name="serviceType"
              value={report.serviceType}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              placeholder={`Previous: ${report.serviceType}`}
            />
            <TextField
              label="Section"
              variant="outlined"
              name="section"
              value={report.section}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              placeholder={`Previous: ${report.section}`}
            />
            <TextField
              label="Supervisor"
              variant="outlined"
              name="supervisor"
              value={report.supervisor}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              placeholder={`Previous: ${report.supervisor}`}
            />
            <TextField
              label="Location"
              variant="outlined"
              name="location"
              value={report.location}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              placeholder={`Previous: ${report.location}`}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update Report
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default EditReportPage;
