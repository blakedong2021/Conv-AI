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
 
export default function ProductSummary() {
  return (
      <React.Fragment>
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
