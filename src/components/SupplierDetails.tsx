import * as React from 'react';
import {
  Box,
  Container,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Typography,
 } from '@mui/material';
 import ExpansionPlaceholder from '../assets/route.svg';
 
export default function ProductSummary() {
  return (
<<<<<<< HEAD
      <React.Fragment>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
              <Stack direction="row" spacing={8} sx={{p: 4}}>
                  <Stack spacing={2}>
                      <Chip size="medium" label="Distance" />
                      <Typography align="center">Distance</Typography>
                  </Stack>
                  <Stack spacing={2}>
                      <Chip size="medium" label="Distance" />
                      <Typography align="center">Total Weight</Typography>
                  </Stack>
                  <Stack spacing={2}>
                      <Chip size="medium" label="Distance" />
                      <Typography align="center">Trip Duration</Typography>
                  </Stack>
                  <Stack spacing={2}>
                      <Chip size="medium" label="Distance" />
                      <Typography align="center">Total Carbon Cost</Typography>
                  </Stack>
              </Stack>

          </Box>
      </React.Fragment>
=======
    <Box
      component="img"
      sx={{
        pl: 4,
        pr: 4,
        width: "90vh"
      }}
      alt="SUPPLIER ROUTES"
      src={ExpansionPlaceholder}
    />
>>>>>>> 9722649b6fc7a3a1d5a300be3a8a06b8385c971b
  );
}
