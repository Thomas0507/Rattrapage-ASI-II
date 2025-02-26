import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { Link } from 'react-router-dom';
import { useNavigate  } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { useAuth } from '../hooks/useAuth';


function Header(props) {
  const auth = props.user ? true : false;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  return (
    <div className='header-wrapper'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              component={Link} to="/"
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Palworld Deck
            </Typography>
            {auth ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to='/profile' onClick={handleClose}>Profile</MenuItem>
                  <MenuItem component={Link} to='/settings' onClick={handleClose}>Settings</MenuItem>
                  <MenuItem component={Link} to='/app/logout' onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            ) :
              <Button color="inherit" href='/login'>Login</Button>
            }
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;


