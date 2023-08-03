// Sidebar.js

import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: '#1769aa', // Gradient background color
        },
      }}
    >
      <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
        <img  alt="logo" style={{ height: '60px' }} />
      </Box>
      <Divider />
      <List>
        {['Home', 'Books', 'CD', 'Profile'].map((text, index) => (
          <React.Fragment key={text}>
            <ListItem
              button
              onClick={() => navigate(`/${text.toLowerCase()}`)}
              sx={{ color: '#fff', fontSize: '18px' }} // white text color
            >
              <ListItemText primary={text} style={{fontWeight:'bolder' , fontSize:'40px'}} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
