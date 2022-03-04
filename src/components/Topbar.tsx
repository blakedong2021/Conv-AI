import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import UserAvatar from '../assets/user.jpg';
import { useNavigate } from 'react-router-dom';
import { Grain } from '@mui/icons-material';

function TopbarContent() {
  let navigate = useNavigate();

  return (
    <AppBar 
      position="fixed" 
      color={"primary"} 
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar
        sx={{
          p: '12px', 
        }}
      >
        <Avatar
          alt="Cara Thrase"
          src={UserAvatar}
          sx={{ width: 56, height: 56, mr: 2 }}
        >CT</Avatar>
        <Typography
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Welcome Back, Cara!
        </Typography>
        <IconButton
          onClick={() => navigate('/') }
          color="primary"
          size="small"
          sx={{ 
            flexDirection: "column"
          }}
        >
          <LogoutIcon />Log Out
        </IconButton>
        <Typography
          variant="h4"
          color="secondary"
          sx={{
            // height: 32,
            pl: 4,
            pr: 4,
          }}
        >
          <Grain/>
          ConvAI
        </Typography>        
      </Toolbar>
    </AppBar>
  );
}

export default function Topbar() {
  return <TopbarContent />;
}
