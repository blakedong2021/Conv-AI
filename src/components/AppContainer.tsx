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

import Dashboard from './Dashboard';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import appTheme from '../theme.js';

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
          </Container>
        </Box>
      {/* <Sidebar/> */}
      </Box>
    </ThemeProvider>
  );
}

