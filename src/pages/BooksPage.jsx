import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, TextField, Grid } from '@mui/material';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import {useNavigate} from 'react-router-dom';
import NavBar from '../components/NavBar';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("Error fetching books", error);
      });
  }, []);

  const handleViewClick = (bookId) => {
    // Handle view button click here. 
    // For example, navigate to a book detail page
    navigate(`/singlebook/${bookId}`);

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
        <Typography variant="h4" component="div" sx={{ marginBottom: '20px' }}>Books</Typography>
        <TextField 
          variant="outlined"
          placeholder="Search for a book"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginBottom: '20px' }}
        />
        <Grid container spacing={2} justifyContent="start">
          {books.map(book => (
            <Grid item xs={12} sm={3} md={3} key={book._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={book.imageUrl}
                  alt={book.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" color="primary" onClick={() => handleViewClick(book._id)}>
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

export default BooksPage;
