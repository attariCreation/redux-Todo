import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
export default function Header() {

    const userName = localStorage.getItem("userName")
    const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
       
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userName}
          </Typography>
          <Button color="inherit" 
          onClick={( ) => dispatch(logoutUser())}
          >logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}