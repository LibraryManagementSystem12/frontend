import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import Swal from 'sweetalert2';

const CardForm = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('token');
    
        const name = event.target.name.value;
        const email = event.target.email.value;
        const amount = event.target.amount.value;
        const address = event.target.address.value;
    
        axios.post('http://localhost:5000/api/payments', {
          name,
          email,
          amount,
          address,
          userId
        })
        .then(response => {
          console.log(response.data);
          Swal.fire('Success!', 'Payment data has been stored successfully.', 'success');
        })
        .catch(error => {
          console.error('Error storing payment data', error);
          Swal.fire('Error!', 'Failed to store payment data.', 'error');
        });
      };

  return (
    <form onSubmit={handleSubmit}>
      <TextField required fullWidth margin="normal" variant="outlined" name="name" label="Name on Card" />
      <TextField required fullWidth margin="normal" variant="outlined" name="email" label="Email Address" />
      <TextField disabled fullWidth margin="normal" variant="outlined" name="amount" label="Amount" defaultValue="100" />
      <TextField required fullWidth margin="normal" variant="outlined" name="address" label="Billing Address" />
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary" fullWidth>Pay Now</Button>
      </Box>
    </form>
  );
};

const Checkout = () => {
  return (
    <>
    <NavBar />
    <Sidebar />
    <Box sx={{ padding: '30px', marginY: '50px' }}>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Typography variant="h5" gutterBottom>Make the Payment</Typography>
          <img src="https://cdnl.iconscout.com/lottie/premium/thumb/card-payment-5557822-4644371.gif" alt="Gif related to payments" />
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography variant="h5" gutterBottom>Enter Details</Typography>
          <CardForm />
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Checkout;
