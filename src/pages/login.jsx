import { TextField, Button, Typography, Box, Link, Paper } from '@mui/material';
import { useState } from 'react';
import { loginUser as loginUserApi } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import {loginUser as loginUserRedux} from "../redux/userSlice"
import Loader from "../components/Loader"
import { useDispatch } from 'react-redux';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [userData, setUserData] = useState({email: "" , password: ""})

    const [loading, setLoading ] = useState(false)

    
    const loginUser = async (e) => {

        e.preventDefault();
    
        try {
          setLoading(true)
            const response = await loginUserApi(userData);

            if (!response || !response.token) {
                alert("Please enter a valid username or password");
                return;
            }

            console.log(response);


            dispatch(loginUserRedux({userName: response.existingUser.name, token: response.token, userId: response.existingUser._id}))

            setTimeout(() => {

            }, 1000)
              // console.log("token that is saved in the redux store: " , response.token)
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            alert("please enter correct username or password");
        }
        finally{
          setLoading(false)
        }
    };
    
  return (
   <>
   {loading ? ( <Loader /> ) : ( 
     <Box
     display="flex"
     justifyContent="center"
     alignItems="center"
     minHeight="100vh"
     bgcolor="#f5f5f5"
   >
     <Paper elevation={3} sx={{ p: 4, width: 350 }}>
       <Typography variant="h5" component="h1" gutterBottom textAlign="center">
         Login
       </Typography>

   <form onSubmit={loginUser}>
       <TextField
         fullWidth
         label="Email"
         variant="outlined"
         margin="normal"
         type="email"
         value={userData.email}
         onChange={(e) =>
           setUserData((prev) => ({ ...prev, email: e.target.value }))
         }
         
         
       />
       <TextField
         fullWidth
         label="Password"
         variant="outlined"
         margin="normal"
         type="password"
         value={userData.pass}
         onChange={(e) =>
           setUserData((prev) => ({ ...prev, password: e.target.value }))
         }
         
       />

       <Button
         fullWidth
         variant="contained"
         color="primary"
         type='submit'
         sx={{ mt: 2, mb: 2 }}

       >
         Login
       </Button>

       </form>

       <Typography variant="body2" align="center">
         Don’t have an account?{' '}
         <Link href="/signup" underline="hover">
           Sign Up
         </Link>
       </Typography>
     </Paper>
   </Box>
   ) }
   </>
  );
};

export default Login;
