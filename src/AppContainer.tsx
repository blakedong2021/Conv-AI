import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Box, 
  Container,
  Link,
  Toolbar,
  Typography,

} from '@mui/material';

import Dashboard from './components/Dashboard';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import appTheme from './theme.js';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        PointB Inc.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function AppContainer() {
  return (
    <ThemeProvider theme={appTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Topbar/>
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar /> 
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <Dashboard />
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      {/* <Sidebar/> */}
      </Box>
    </ThemeProvider>
  );
}

