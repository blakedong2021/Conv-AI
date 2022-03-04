import * as React from 'react';
import { 
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography
 } from '@mui/material';
 import appTheme from '../theme.js';
 import { ThemeProvider } from '@mui/material/styles';
 import route from '../assets/route.svg';
 import { useNavigate } from 'react-router-dom';

export default function Landing() {
  let navigate = useNavigate();  
  return (
    <ThemeProvider theme={appTheme}>
      <Box
          sx={{ flexGrow: 1, height: "100vh", bgcolor: 'background.default', p: 3 }}
      >   
        <Grid container alignItems="center" alignContent="center" sx={{ mt: 8 }}>
          <Grid item xs={12} md={7}>
            <Stack direction="column" spacing={8} alignItems="center" sx={{ m: 8}}>
              <Typography variant="h4" color="primary">Optimize your supply chain on total delivered cost.</Typography>
              <Typography variant="h6" color="secondary">Until you can quantify total delivered costs, it’s impossible to shrink your carbon footprint. ConvAI not only makes it possible, we make it easy.  </Typography>
              <Button 
                size="large" 
                variant="contained" 
                color="secondary" 
                sx={{width: 200, p: 2}}
                onClick={() => {navigate('/app')}}>
                  Begin
                </Button>
            </Stack>
          </Grid>        
          <Grid item xs={0} md={5}>
            <Paper variant='elevation' elevation={4} sx={{ m: 8 }}>
              <Box
                component="img"
                sx={{ p: 4, width: "100%" }}
                src={route}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>           
    </ThemeProvider>    

  );
}