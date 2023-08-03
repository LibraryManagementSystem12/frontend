import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import Adminbar from '../components/Adminbar';

const AddCd = () => {
  const [cd, setCd] = useState({
    title: '',
    description: '',
    year: '',
    artist: '',
    genre: '',
    imageUrl: '',
    label: '',
  });

  const handleChange = (e) => {
    setCd({
      ...cd,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/cds', cd);
      console.log(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
    <NavBar/>
    <Adminbar/>
        <h2>Add CD</h2>
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '900px', margin: 'auto' }}>
      <TextField
        name="title"
        label="Title"
        required
        value={cd.title}
        onChange={handleChange}
      />
      <TextField
        name="description"
        label="Description"
        value={cd.description}
        onChange={handleChange}
      />
      <TextField
        name="year"
        label="Year"
        required
        value={cd.year}
        onChange={handleChange}
      />
      <TextField
        name="artist"
        label="Artist"
        required
        value={cd.artist}
        onChange={handleChange}
      />
      <TextField
        name="genre"
        label="Genre"
        value={cd.genre}
        onChange={handleChange}
      />
      <TextField
        name="label"
        label="Label"
        value={cd.label}
        onChange={handleChange}
        />
      <TextField
        name="imageUrl"
        label="Image URL"
        value={cd.imageUrl}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Add CD
      </Button>
    </Box>
    </>
  );
};

export default AddCd;
