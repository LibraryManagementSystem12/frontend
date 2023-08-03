import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

const SingleCd = () => {
    const [cd, setCd] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate(`/borrowcd/${cd._id}`);
      console.log("clicked");
    }
  
    useEffect(() => {
      axios.get(`http://localhost:5000/api/cds/${id}`)
        .then(response => {
          setCd(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error("Error fetching CD", error);
        });
    }, [id]);
  return (
    <div>
         <NavBar />
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: '20px' }}>
      <Sidebar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginLeft: '20px' }}>
        <Typography variant="h2" component="div" sx={{ marginBottom: '20px' }}>{cd.title}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CardMedia
              component="img"
              image={cd.imageUrl}
              alt={cd.title}
              sx={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
            />
            <Typography variant="body1" component="p" sx={{ marginTop: '20px' }}>
              {cd.description}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" gutterBottom>Details</Typography>
                
                <List>
                  <ListItem>
                    <ListItemText primary="Artist" secondary={cd.artist} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Genre" secondary={cd.genre} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Year" secondary={cd.year} />
                  </ListItem>
                </List>

                <Button variant="contained" color="primary" style={{width:'100%', margin:'20px'}} onClick={() => handleClick()}>Borrow</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </div>
  )
}

export default SingleCd






