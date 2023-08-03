import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const drawerWidth = 240;

const Adminbar = () => {
  const navigate = useNavigate();

  const itemsList = [
    {
      section: "Home",
      items: [{ text: "Dashboard", onClick: () => navigate("/home") }]
    },
    {
      section: "Books",
      items: [
        { text: "Add Book", onClick: () => navigate("/addbook") },
        { text: "List Books", onClick: () => navigate("/listbooks") }
      ]
    },
    {
      section: "CD",
      items: [
        { text: "Add CD", onClick: () => navigate("/addcd") },
        { text: "List CD", onClick: () => navigate("/listcd") }
      ]
    },
    {
      section: "Borrowings",
      items: [
        { text: "View Borrowings", onClick: () => navigate("/listborrowings") }
      ]
    },
    {
      section: "Profile",
      items: [{ text: "View Profile", onClick: () => navigate("/adminprofile") }]
    }
  ];

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
        <img  alt="logo" src='https://i.ibb.co/f4KZ16g/logo.jpg' style={{ height: '60px' }} />
      </Box>
      <Divider />
      <List>
        {itemsList.map((section, index) => (
          <React.Fragment key={index}>
            <div style={{background:'#1769bb'}}>
            <Typography variant="h6" color="white" padding="10px" align="center">
              {section.section}
            </Typography>
            </div>
            <Divider />
            {section.items.map((item, idx) => (
              <ListItem
                button
                key={idx}
                onClick={item.onClick}
                sx={{ color: '#fff', fontSize: '18px' }} // white text color
              >
                <ListItemText primary={item.text} style={{fontWeight:'bolder' , fontSize:'30px'}} />
              </ListItem>
            ))}
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Adminbar;
