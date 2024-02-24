import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Backdrop, Fade, Card, CardContent, Typography, Box } from '@mui/material';
import Image from '../assets/logoo.jpg';
import ReportDetailsModal from '../components/ReportDetailsModal'; 

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/fetch-reports');
        if (response.status === 200) {
          setReports(response.data.reverse());
        } else {
          console.error('Error fetching reports');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const openDetailsPopup = (report) => {
    setSelectedReport(report);
  };
  
  const closeDetailsPopup = () => {
    setSelectedReport(null);
  };

  return (
    <div className="container-fluid p-3 report-container">
      <div className="">
        <div className="head-container">
          <div className="logo">
            <img src={Image} alt="" />
          </div>
          <h1>Report</h1>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Service</StyledTableCell>
                <StyledTableCell>Section</StyledTableCell>
                <StyledTableCell>Supervisor</StyledTableCell>
                <StyledTableCell>Personnel Count</StyledTableCell>
                <StyledTableCell>Volunteer's Count</StyledTableCell>
                <StyledTableCell>Challenges</StyledTableCell>
                <StyledTableCell>Solution</StyledTableCell>
                <StyledTableCell>Faulty Equipment</StyledTableCell>
                <StyledTableCell>Remark</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report, index) => (
                <StyledTableRow key={report.id} onClick={() => openDetailsPopup(report)}>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => openDetailsPopup(report)}>
                      {index + 1}
                    </Button>
                  </TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.serviceType}</TableCell>
                  <TableCell>{report.section}</TableCell>
                  <TableCell>{report.supervisor}</TableCell>
                  <TableCell>{report.personnelCount}</TableCell>
                  <TableCell>{report.volunteersCount}</TableCell>
                  <TableCell>{report.challenges}</TableCell>
                  <TableCell>{report.solution}</TableCell>
                  <TableCell>{report.equipmentDetails}</TableCell>
                  <TableCell>{report.remarks}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedReport && (
          <ReportDetailsModal
            report={selectedReport}
            onClose={closeDetailsPopup}
          />
        )}

        <Modal
          open={Boolean(selectedReport)}
          onClose={closeDetailsPopup}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={Boolean(selectedReport)}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%', // Adjust the width as needed
                maxWidth: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                '@media (max-width: 600px)': {
                  width: '90%',
                },
              }}
            >
              <Card>
                <CardContent>
                  <h2>Report Details</h2>
                  <Typography variant="h5" component="div" mb={2}>
                    {selectedReport?.serviceType}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Date: {selectedReport?.date}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Section: {selectedReport?.section}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Supervisor: {selectedReport?.supervisor}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Personnel Count: {selectedReport?.personnelCount}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Volunteers Count: {selectedReport?.volunteersCount}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Challenges: {selectedReport?.challenges}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Solution: {selectedReport?.solution}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Remarks: {selectedReport?.remarks}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Fade>
        </Modal>

      </div>
    </div>
  );
}

// Styled components for TableCell and TableRow
const StyledTableCell = ({ children, ...props }) => (
  <TableCell {...props} sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
    {children}
  </TableCell>
);

const StyledTableRow = ({ children, ...props }) => (
  <TableRow {...props} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
    {children}
  </TableRow>
);

export default ReportPage;
