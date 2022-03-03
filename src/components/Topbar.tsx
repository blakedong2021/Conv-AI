import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../assets/logo.png';
import UserAvatar from '../assets/user.jpg';

function TopbarContent() {
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
          color="inherit"
          size="small"
          sx={{ 
            flexDirection: "column"
          }}
        >
          <LogoutIcon />Log Out
        </IconButton>
        <Box
            component="img"
            sx={{
              height: 32,
              pl: 4,
              pr: 4,
            }}
            alt="Your logo."
            src={Logo}
        />
      </Toolbar>
    </AppBar>
  );
}

export default function Topbar() {
  return <TopbarContent />;
}
