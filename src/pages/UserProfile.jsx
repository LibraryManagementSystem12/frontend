import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';

const UserProfile = () => {
    const userId = localStorage.getItem("token");
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
    nicNumber: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${userId}`)
      .then((res) => {
        setUserData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data", err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:5000/api/users/${userId}`, userData)
      .then((res) => {
        console.log('Profile updated successfully');
      })
      .catch((err) => {
        console.error("Error updating profile", err);
      });
  };

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
    <NavBar/>
    <Box component="main" sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', boxSizing: 'border-box'}}>
    <Sidebar component="nav" sx={{ width: { sm: '100%', md: '240px' }, flexShrink: { sm: 0, md: 0 } }} />
    <Paper elevation={6} sx={{ padding: '30px', marginLeft: '20px', flexGrow: 1 }}>
      <h2>User Profile</h2>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          sx={{ marginY: '10px' }}
        />
        <TextField
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          sx={{ marginY: '10px' }}
        />
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={userData.email}
          onChange={handleChange}
          sx={{ marginY: '10px' }}
        />
        <TextField
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          value={userData.address}
          onChange={handleChange}
          sx={{ marginY: '10px' }}
        />
        <TextField
          required
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleChange}
          sx={{ marginY: '10px' }}
        />
        <TextField
          required
          fullWidth
          id="nicNumber"
          label="NIC Number"
          name="nicNumber"
          value={userData.nicNumber}
          onChange={handleChange}
          sx={{ marginY: '10px' }}
        />
       <Button type="submit" variant="contained" color="primary" sx={{ marginY: '10px', alignSelf:'flex-end' }}>Update Profile</Button>

      </Box>
    </Paper>
  </Box>
  </div>
  );
}

export default UserProfile;
