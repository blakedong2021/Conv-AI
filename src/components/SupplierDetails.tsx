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
  );
}
