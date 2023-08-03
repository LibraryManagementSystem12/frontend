import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, TextField, Grid } from '@mui/material';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import {useNavigate} from 'react-router-dom';
import NavBar from '../components/NavBar';

const CdPage = () => {
  const [cds, setCds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/cds')
      .then(response => {
        setCds(response.data);
      })
      .catch(error => {
        console.error("Error fetching cds", error);
      });
  }, []);

  const handleViewClick = (cdId) => {
    // Handle view button click here. 
    // For example, navigate to a cd detail page
    navigate(`/singlecd/${cdId}`);

  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Implement search functionality here
  };

  return (
    <>
    <NavBar />
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: '20px' }}>
      <Sidebar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', marginLeft: '20px' }}>
        <Typography variant="h4" component="div" sx={{ marginBottom: '20px' }}>CDs</Typography>
        <TextField 
          variant="outlined"
          placeholder="Search for a CD"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginBottom: '20px' }}
        />
        <Grid container spacing={2} justifyContent="start">
          {cds.map(cd => (
            <Grid item xs={12} sm={3} md={3} key={cd._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={cd.imageUrl}
                  alt={cd.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {cd.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cd.artist}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" color="primary" onClick={() => handleViewClick(cd._id)}>
                    View
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    </>
  );
}

export default CdPage;
