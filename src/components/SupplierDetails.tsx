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
 import ExpansionPlaceholder from '../assets/supplier_expand.png';
 
export default function ProductSummary() {
  return (
      <React.Fragment>
          <Box
              component="img"
              sx={{
                  pl: 4,
                  pr: 4,
              }}
              alt="SUPPLIER ROUTES"
              src={ExpansionPlaceholder}
          />
          <Container>
              <Stack direction="row" spacing={4}>
                  <Stack spacing={2}>
                      <Chip label="Distance" />
                      <p>Distance</p>
                  </Stack>
                  <Stack spacing={2}>
                      <Chip label="Distance" />
                      <p>Total Weight</p>
                  </Stack>
                  <Stack spacing={2}>
                      <Chip label="Distance" />
                      <p>Trip Duration</p>
                  </Stack>
                  <Stack spacing={2}>
                      <Chip label="Distance" />
                      <Typography align="center">Total Carbon Cost</Typography>
                  </Stack>
              </Stack>

          </Container>
      </React.Fragment>
  );
}
