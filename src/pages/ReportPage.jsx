import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Backdrop, Fade, Card, CardContent, Typography, Box} from '@mui/material';
import Image from '../assets/dlbc.png';
import ReportDetailsModal from '../components/ReportDetailsModal'; 



const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/fetch-reports`);
  
        if (response.status === 200) {
          // Check if response.data is an array before attempting to reverse
          if (Array.isArray(response.data)) {
            setReports(response.data.reverse());
          } else {
            console.error('Error: Response data is not an array');
          }
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


  const handleDelete = async (id) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/api/delete-report/` + id)
    .then(res => {
      console.log(res);
      window.location.reload();
    })
    .catch(err => console.log(err));
  }
  
  
  
  
  

  return (
    <div className="container-fluid p-3 report-container">
      <div className="">
        <div className="container">
        <div className="head-container">
          <div className="logo">
            <img src={Image} alt="" className='img' style={{ width: '50px', height: '50px' }} />
          </div>
          <h1 className='me-5' >Report</h1>
        </div>
        </div>
        <TableContainer component={Paper}>
          <Table className=''>
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Service</StyledTableCell>
                <StyledTableCell>Section</StyledTableCell>
                <StyledTableCell>Supervisor</StyledTableCell>
                {/* <StyledTableCell>Personnel Count</StyledTableCell>
                <StyledTableCell>Volunteer's Count</StyledTableCell>
                <StyledTableCell>Challenges</StyledTableCell>
                <StyledTableCell>Solution</StyledTableCell>
                <StyledTableCell>Faulty Equipment</StyledTableCell>
                <StyledTableCell>Remark</StyledTableCell> */}
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell className="text-center">Action</StyledTableCell>
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
                  {/* <TableCell>{report.personnelCount}</TableCell>
                  <TableCell>{report.volunteersCount}</TableCell>
                  <TableCell>{report.challenges}</TableCell>
                  <TableCell>{report.solution}</TableCell>
                  <TableCell>{report.equipmentDetails}</TableCell>
                  <TableCell>{report.remarks}</TableCell> */}
                  <TableCell>{report.location}</TableCell>
                  <TableCell className='bg-light' ><Link to={`/edit/${report._id}`} className="btn btn-primary">Edit</Link></TableCell>
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
                  <Typography variant="h6" component="div" mb={2}>
                    {selectedReport?.serviceType}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Date: {selectedReport?.date}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Service Type: {selectedReport?.subService}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Service Day: {selectedReport?.subServiceDay}
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
                  <Typography color="textSecondary" gutterBottom>
                    Location: {selectedReport?.location}
                  </Typography>
                  
                </CardContent>
              </Card>
              <div className="d-flex justify-content-center align-items-center">
                  <div className="btn btn-danger mt-2" onClick={() => handleDelete(selectedReport._id)} >Delete</div>
                </div>
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