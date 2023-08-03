import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Button from "@mui/material/Button";
import Sidebar from "../components/Sidebar";
import { Box, Paper } from "@mui/material";
import NavBar from "../components/NavBar";
import Adminbar from "../components/Adminbar";

const ListCd = () => {
  const [cds, setCds] = useState([]);

  // Fetch cds when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cds")
      .then((res) => {
        setCds(res.data);
      })
      .catch((err) => {
        console.error("Error fetching cds", err);
      });
  }, []);

  const handleEdit = (id) => {
    // Redirect or open modal to edit the cd with the given id
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/cds/${id}`)
      .then((res) => {
        // Remove the deleted cd from the state
        setCds(cds.filter((cd) => cd._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting cd", err);
      });
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "artist", headerName: "Artist", flex: 1 },
    { field: "genre", headerName: "Genre", flex: 1 },
    { field: "year", headerName: "Released Year", flex: 1 },
    { field: "label", headerName: "Label", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            onClick={() => handleEdit(params.row._id)}
            variant="outlined"
            color="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(params.row._id)}
            variant="outlined"
            color="secondary"
          >
            Delete
          </Button>
        </Box>
      ),
    },
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
        <h2>CDs List</h2>
        <DataGrid
          rows={cds}
          columns={columns}
          pageSize={5}
          rowHeight={50}
          disableSelectionOnClick
          getRowId={(row) => row._id} // Here's the change
        />
      </Paper>
    </Box>
    </>
  );
};

export default ListCd;
