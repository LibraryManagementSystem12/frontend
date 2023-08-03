import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import Adminbar from "../components/Adminbar";

const AdminProfile = () => {
  const userId = localStorage.getItem("token");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    nicNumber: "",
  });

  const [subscription, setSubscription] = useState({
    type: "Gold",
    lastPaidDate: "",
    nextPaymentDue: "",
  });

  const [borrowingHistory, setBorrowingHistory] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${userId}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data", err);
      });

    // fetch subscription and borrowing history
    // axios.get(`http://localhost:5000/api/subscription/${userId}`)
    //   .then((res) => {
    //     setSubscription(res.data);
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching subscription data", err);
    //   });

    axios.get(`http://localhost:5000/api/borrowings/user/${userId}`)
      .then((res) => {
        console.log(res.data);
        setBorrowingHistory(res.data);
      })
      .catch((err) => {
        console.error("Error fetching borrowing history", err);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <Box
        component="main"
        sx={{
          padding: "20px",
          display: "flex",
          textAlign: "start",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          height: "100vh",
          boxSizing: "border-box",
        }}
      >
        <Adminbar
          component="nav"
          sx={{
            width: { sm: "100%", md: "240px" },
            flexShrink: { sm: 0, md: 0 },
          }}
        />
        <Paper
          elevation={6}
          sx={{ padding: "30px", marginLeft: "20px", flexGrow: 1 }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            User Profile
          </Typography>
          <Typography variant="h6">
            Name: {userData.firstName} {userData.lastName}
          </Typography>
          <Typography variant="h6">Email: {userData.email}</Typography>
          <Typography variant="h6">Address: {userData.address}</Typography>
          <Typography variant="h6">Phone: {userData.phoneNumber}</Typography>
          <Typography variant="h6">NIC: {userData.nicNumber}</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/userprofile"
            >
              Edit Profile
            </Button>
          </Box>

            <Divider sx={{ marginY: "20px" }} />
        </Paper>
      </Box>
    </div>
  );
};

export default AdminProfile;
