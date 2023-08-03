import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button,TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import Swal from 'sweetalert2';

const BorrowBook = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const { id } = useParams();
  const [book, setBook] = useState(null);

  // Get user information from localStorage
  const userId = localStorage.getItem("token");
  const userName = localStorage.getItem("username");

  const onSubmit = data => {
    // Combine the borrowing data with the user and book IDs
    const borrowingData = {
      ...data,
      bookId: id,
      userId: userId,
      userName: userName,
      bookName : book.title
    };
  
    console.log(borrowingData);
  
    axios.post('http://localhost:5000/api/borrowings', borrowingData)
      .then(response => {
        console.log(response.data);
        Swal.fire('Success!', 'The book was borrowed successfully.', 'success');
      })
      .catch(error => {
        console.error('Error creating borrowing', error);
        Swal.fire('Error!', 'There was an issue borrowing the book.', 'error');
      });
  };
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error fetching book data', error);
      });
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <>
    <NavBar />
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: '20px' }}>
      <Sidebar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginLeft: '20px' }}>
        <Typography variant="h2" component="div" sx={{ marginBottom: '20px' }}>{book.title}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CardMedia
              component="img"
              image={book.imageUrl}
              alt={book.title}
              sx={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
            />
            <Typography variant="body1" component="p" sx={{ marginTop: '20px' }}>
              {book.description}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" gutterBottom>Borrowing Information</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="startDate"
                    control={control}
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="date"
                        label="Start Date"
                        sx={{ width: '100%', marginBottom: '20px' }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="endDate"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="date"
                        label="End Date"
                        sx={{ width: '100%', marginBottom: '20px' }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                  <Button type="submit" variant="contained" color="primary" style={{width:'100%', margin:'20px'}}>Submit</Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </>
  );
}

export default BorrowBook;

