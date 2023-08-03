import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

const SingleBook = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/borrowbook/${book._id}`);
    console.log("clicked");
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(response => {
        setBook(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching book", error);
      });
  }, [id]);

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
                <Typography variant="h5" gutterBottom>Details</Typography>
                
                <List>
                  <ListItem>
                    <ListItemText primary="Author" secondary={book.author} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Genre" secondary={book.genre} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Publication Date" secondary={new Date(book.publicationDate).toDateString()} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="ISBN" secondary={book.isbn} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Publisher" secondary={book.publisher} />
                  </ListItem>
                </List>

                <Button variant="contained" color="primary" style={{width:'100%', margin:'20px'}} onClick={() => handleClick()}>Borrow</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </>
  );
}

export default SingleBook;
