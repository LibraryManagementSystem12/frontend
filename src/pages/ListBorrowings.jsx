import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Box, Paper } from "@mui/material";
import NavBar from "../components/NavBar";
import Adminbar from "../components/Adminbar";

const ListBorrowings = () => {
  const [borrowings, setBorrowings] = useState([]);

  // Fetch borrowings when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/borrowings") // assuming this is the endpoint for getting borrowings
      .then((res) => {
        setBorrowings(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching borrowings", err);
      });
  }, []);

  const columns = [
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "userName", headerName: "User Name", flex: 1 },
    { field: "bookName", headerName: "Book Name", flex: 1 },
    { field: "bookId", headerName: "Book ID", flex: 1 },
    { field: "endDate", headerName: "Borrowing Date", flex: 1 },
    { field: "startDate", headerName: "Borrowing Time", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <>
    <NavBar />
    <Box
      component="main"
      sx={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        <h2>Borrowings List</h2>
        <DataGrid
          rows={borrowings}
          columns={columns}
          pageSize={5}
          rowHeight={50}
          disableSelectionOnClick
          getRowId={(row) => row._id} // assuming borrowings also have _id field
        />
      </Paper>
    </Box>
    </>
  );
};

export default ListBorrowings;
