import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Button } from '@mui/material';
import NavBar from '../components/NavBar';
import Adminbar from '../components/Adminbar';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Admin = () => {
  // ...state and useEffect omitted for brevity
  const [employeeCount, setEmployeeCount] = useState(0);
  const [borrowingCount, setBorrowingCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [recentBorrowings, setRecentBorrowings] = useState([]);
  const [recentBooks, setRecentBooks] = useState([]);
  const [recentCDs, setRecentCDs] = useState([]);

  const printRef = useRef(null);

const printDocument = () => {
  if (printRef.current) {
    html2canvas(printRef.current)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("admin.pdf"); 
      })
      .catch(err => {
        // Log any errors that occur during the promise
        console.error(err);
      });
  }
}

  

  // replace these with your actual API calls
  useEffect(() => {
    // Fetch data from APIs
    axios.get('http://localhost:5000/api/users/totalUsers').then((res) => setEmployeeCount(res.data.totalUsers));
    axios.get('http://localhost:5000/api/borrowings/totalBorrowings').then((res) => setBorrowingCount(res.data.totalBorrowings));
    axios.get('http://localhost:5000/api/books/totalbooks').then((res) => setBookCount(res.data.totalBooks));
    axios.get('http://localhost:5000/api/borrowings').then((res) => setRecentBorrowings(res.data));
    axios.get('http://localhost:5000/api/books').then((res) => setRecentBooks(res.data));
    axios.get('http://localhost:5000/api/cds').then((res) => setRecentCDs(res.data));
  }, []);


  return (
    <Box sx={{ }}>
      <NavBar />
      <Adminbar/>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: '240px'}} ref={printRef}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Total Employees</Typography>
                <Typography variant="h5" component="div">{employeeCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Total Borrowings</Typography>
                <Typography variant="h5" component="div">{borrowingCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Total Books</Typography>
                <Typography variant="h5" component="div">{bookCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <br/><br/><br/>

        {/* Table for recent books */}
        <Typography variant="h5" gutterBottom>Recent Books</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Author</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentBooks.map((book, index) => (
                <TableRow key={index}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell align="right">{book.author}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br/><br/><br/>

        {/* Table for recent CDs */}
        <Typography variant="h5" gutterBottom>Recent CDs</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Artist</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentCDs.map((cd, index) => (
                <TableRow key={index}>
                  <TableCell>{cd.title}</TableCell>
                  <TableCell align="right">{cd.artist}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br/><br/><br/>

         {/* Table for recent borrowings */}
         <Typography variant="h5" gutterBottom>Recent Borrowings</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="right">Item</TableCell>
                <TableCell align="right">Date Borrowed</TableCell>
                <TableCell align="right">Due Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <br/>
              {recentBorrowings.map((borrowing, index) => (
                <TableRow key={index}>
                  <TableCell>{borrowing.userName}</TableCell>
                  <TableCell align="right">{borrowing.bookName}</TableCell>
                  <TableCell align="right">{borrowing.startDate}</TableCell>
                  <TableCell align="right">{borrowing.endDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={printDocument}>Download PDF</Button>

      </Box>
    </Box>
  );
}

export default Admin;







