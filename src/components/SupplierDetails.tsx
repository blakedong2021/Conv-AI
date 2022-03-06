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
 import DublinRoute from '../assets/dublin_miami.svg';
 import AltamiraRoute from '../assets/altamira_miami.svg';
 import IrvingRoute from '../assets/irving_miami.svg';
 import TokyoRoute from '../assets/tokyo_miami.svg';
 
export default function SupplierDetails(props: {destination: string, distance: number, weight: string, duration: string, carboncost: string}) {
  const { destination, distance, weight, duration, carboncost } = props;
  return (
      <React.Fragment>
          <Box
            component="img"
            sx={{
              pl: 4,
              pr: 4,
              width: "100%"
            }}
            alt="SUPPLIER ROUTES"
            src={TokyoRoute}
          />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
              <Stack direction="row" spacing={8} sx={{p: 4}}>
                  <Stack spacing={2}>
                      <Chip size="medium" label={distance.toLocaleString()}/>
                      <Typography variant="h6" align="center">Distance</Typography>
                  </Stack>
                  <Stack spacing={2}>
                      <Chip size="medium" label={weight} />
                      <Typography variant="h6" align="center">Total Weight</Typography>
                  </Stack>
                  <Stack spacing={2}>
                      <Chip size="medium" label={duration} />
                      <Typography variant="h6" align="center">Trip Duration</Typography>
                  </Stack>
                  <Stack spacing={2}>
                      <Chip size="medium" label={carboncost} />
                      <Typography variant="h6" align="center">Total Carbon Cost</Typography>
                  </Stack>
              </Stack>

          </Box>
      </React.Fragment>
  );
}
