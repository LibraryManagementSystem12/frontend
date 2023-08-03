import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


// import {Link as Navigate} from 'react-router-dom'import ResponsiveAppBar from './components/Navbar';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
    
        nish_ahmd
     {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();



const Login = () => {

  // eslint-disable-next-line
  const [status, setStatus] = React.useState(false);
  const navigate = useNavigate()
  const [error, setError] = React.useState(" ");

//fubction to login the user and display error if login fails
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      axios.post("http://localhost:5000/api/users/login",{
      email: data.get('email'),
      password: data.get('password')
    }).then((res)=>{
      if (res.status === 200) {
        console.log(res.data);
        localStorage.setItem('token', res.data.userId);
        localStorage.setItem('accountType', res.data.accountType);
        localStorage.setItem('username', res.data.username);
        setStatus(res.data.status)
        const id =res.data.userId;
        console.log(res.data.accountType)
        console.log(id)
        const type = res.data.accountType;
        if(1){
          if(res.data.accountType === "Admin"){
            navigate(`/admin`);
          }
          else{
            navigate(`/home`);
          }
          
        }else{
          navigate(`/home`);
        }
        
        
      }else{
        console.log(res)
        
      }
    }).catch((err)=>{
      setError("Invalid credentials");
      //alert("Invalid credentials");
    });
    } catch (error) {
      alert("Invalid credentials");
    }
  };



  return (
    <div>
      <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://miro.medium.com/max/1400/1*oVbBdRUlndQPAl3tvB-qYg.gif)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#FE2D4D' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setError("")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setError("")}
                autoComplete="current-password"
              />
              <h3>{error}</h3>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2  , backgroundColor: '#FE2D4D' }}
              >
                Sign In
              </Button>
              <Grid container>
               
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>
  )
}

export default Login