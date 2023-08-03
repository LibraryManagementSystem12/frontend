import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';

const HomePage = () => {
  const [latestBooks, setLatestBooks] = useState([]);
  const [latestCds, setLatestCds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the latest books
    axios.get('http://localhost:5000/api/books')
      .then(response => {
        console.log(response.data);
        setLatestBooks(response.data);
        return axios.get('http://localhost:5000/api/cds');
      })
      .then(response => {
        setLatestCds(response.data);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <Box sx={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
        <Sidebar />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '20px', flexGrow: 1 }}>
          <Typography variant="h4" component="div" sx={{ marginTop: '20px', marginBottom: '20px' , fontWeight:'bold' }}>
            Welcome to Our Library!
          </Typography>
          <Typography variant="body1" component="div" sx={{ marginBottom: '40px' }}>
            Our library offers an extensive collection of books and CDs for borrowing. Explore our latest arrivals!
          </Typography>
          
          <Typography variant="h5" component="div" sx={{ marginBottom: '20px' }}>Latest Books</Typography>
          <Grid container spacing={2} justifyContent="center">
            {latestBooks.slice(0,3).map((book, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    image={book.imageUrl}
                    alt={book.title}
                    sx={{ height: '200px', objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">{book.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" component="div" sx={{ marginTop: '40px', marginBottom: '20px' }}>Latest CDs</Typography>
          <Grid container spacing={2} justifyContent="center">
            {latestCds.slice(0,3).map((cd, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    image={cd.imageUrl}
                    alt={cd.title}
                    sx={{ height: '200px', objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">{cd.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" component="div" sx={{ marginTop: '40px', marginBottom: '20px' }}>About Us</Typography>
          <Typography variant="body1" component="div">
            We are a community library committed to spreading knowledge and joy through our collections. Whether you're looking for your next favorite book or music inspiration, we've got you covered. Join us and explore the world of literature and music!
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
