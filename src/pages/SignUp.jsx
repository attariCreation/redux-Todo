import { TextField, Button, Typography, Box, Link, Paper } from '@mui/material';
import { useState } from 'react';
import { createUser } from '../api/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser as loginUserRedux } from '../redux/userSlice';
import Loader from "../components/Loader"
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading ] = useState(false)
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });

  const signUpUser = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      
      const response = await createUser(userData);


      dispatch(loginUserRedux({
        userName: response.data.user.name,
        token: response.data.token,
        userId: response.data._id
      }));

      console.log("User ID from Signup component:", response.data._id);

      setTimeout(() => {
      }, 1000)
      

      navigate("/"); // ✅ or navigate("/dashboard") if you have one
    } catch (error) {
      console.error("Signup failed:", error.response.data.message);
      alert("Signup failed:" + error.response.data.message);
      alert("Something went wrong. Please try again later.");
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <>
   {loading ? 
   ( <Loader /> )
     : (
     <Box display="flex"
     justifyContent="center"
     alignItems="center"
     minHeight="100vh"
     bgcolor="#f5f5f5"
   >
     <Paper elevation={3} sx={{ p: 4, width: 350 }}>
       <Typography variant="h5" component="h1" gutterBottom textAlign="center">
         Create Account
       </Typography>

       <form onSubmit={signUpUser}>
         <TextField
           fullWidth
           label="Name"
           value={userData.name}
           onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
           variant="outlined"
           margin="normal"
         />
         <TextField
           fullWidth
           label="Email"
           variant="outlined"
           margin="normal"
           type="email"
           value={userData.email}
           onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
         />
         <TextField
           fullWidth
           label="Password"
           variant="outlined"
           margin="normal"
           type="password"
           value={userData.password}
           onChange={(e) => setUserData((prev) => ({ ...prev, password: e.target.value }))}
         />

         <Button
           fullWidth
           variant="contained"
           color="primary"
           sx={{ mt: 2, mb: 2 }}
           type="submit"
         >
           Sign Up
         </Button>
       </form>

       <Typography variant="body2" align="center">
         Already have an account?{' '}
         <Link href="/login" underline="hover">
           Log In
         </Link>
       </Typography>
     </Paper>
   </Box> )
   }
   </>
  );
};

export default Signup;
