import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import Adminbar from '../components/Adminbar';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
    description: '',
    imageUrl: '',
    isbn: '',
    publishedYear: '',
    publisher: ''
  });

  // Handle form submission to add book
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://localhost:5000/api/books", bookData)
      .then((res) => {
        console.log('Book added successfully');
      })
      .catch((err) => {
        console.error("Error adding book", err);
      });
  };

  // Update state when any field changes
  const handleChange = (event) => {
    setBookData({
      ...bookData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
    <NavBar/>
    <Box component="main" sx={{my:'100px', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', boxSizing: 'border-box', marginY:'120px'}}>
      <Adminbar component="nav" sx={{ width: { sm: '100%', md: '240px' }, flexShrink: { sm: 0, md: 0 } }} />
      <Paper elevation={6} sx={{ padding: '30px', marginLeft: '20px', flexGrow: 1 }}>
        <h2>Add Book</h2>
        <br/>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            onChange={handleChange}
            sx={{ marginY: '10px' }}
          />
          <TextField
            required
            fullWidth
            id="author"
            label="Author"
            name="author"
            onChange={handleChange}
            sx={{ marginY: '10px' }}
          />
          <TextField
            required
            fullWidth
            id="genre"
            label="Genre"
            name="genre"
            onChange={handleChange}
            sx={{ marginY: '10px' }}
          />
          <TextField
            required
            fullWidth
            id="publicationDate"
            label="Publication Date"
            name="publicationDate"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
            sx={{ marginY: '10px' }}
          />
          <TextField
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            rows={4}
            onChange={handleChange}
            sx={{ marginY: '10px' }}
          />
          <TextField
            required
            fullWidth
            id="imageUrl"
            label="Image URL"
            name="imageUrl"
            onChange={handleChange}
            sx={{ marginY: '10px' }}
          />
          <TextField
            required
            fullWidth
            id="isbn"
            label="ISBN"
            name="isbn"
            onChange={handleChange}
            sx={{ marginY: '10px' }}
          />
          <TextField
            required
            fullWidth
            id="publishedYear"
            label="Published Year"
            name="publishedYear"
            onChange={handleChange}
            sx={{ marginY: '10px' }}
          />
          <TextField
            required
            fullWidth
            id="publisher"
            label="Publisher"
            name="publisher"
            onChange={handleChange}
            sx={{ marginY: '10px' }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ marginY: '10px', alignSelf:'flex-end' }}>Add Book</Button>
        </Box>
      </Paper>
    </Box>
    </div>
  );
}

export default AddBook;
