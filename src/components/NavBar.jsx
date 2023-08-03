import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout operation
    localStorage.clear();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
          Library Management System
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" sx={{ mr: 2 }} /> {/* Replace with your avatar url */}
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
