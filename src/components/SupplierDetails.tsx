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
 

export default function SupplierDetails(props: {supplier: string, distance: number, weight: number, duration: string, carboncost: number}) {
  const { supplier, distance, weight, duration, carboncost } = props;

  // since we have no trip duration data, just do a fake calculation based on distance
  const milesPerDay = 308;  // assume we can cover this distance in 1 day
  let days = Math.floor(distance/milesPerDay);
  let hours = Math.floor((distance/milesPerDay-days) * 24);
  let tripDuration = `${days} days ${hours} hr`
  let dollarUSLocale = Intl.NumberFormat('en-US');

  let mapSrc = "";
  switch (supplier) {
    case 'Shamrock Hospital Supply':
      mapSrc = DublinRoute;
      break;
    case 'Tokyo Health Solutions':
      mapSrc = TokyoRoute;
      break;      
    case 'Salud Medical Supply':
      mapSrc = AltamiraRoute;
      break;
    case 'Lone Star Medical':
      mapSrc = IrvingRoute;
      break;      
    default:
      break;
  }

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
            src={mapSrc}
          />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
              <Stack direction="row" spacing={8} sx={{p: 4}}>
                  <Stack spacing={2}>
                      <Chip size="medium" label={distance.toLocaleString() + " mi"}/>
                      <Typography variant="h6" align="center">Distance</Typography>
                  </Stack>
                  <Stack spacing={2}>
                      <Chip size="medium" label={weight.toLocaleString() + " kg"} />
                      <Typography variant="h6" align="center">Total Weight</Typography>
                  </Stack>
                  <Stack spacing={2}>
                      <Chip size="medium" label={tripDuration} />
                      <Typography variant="h6" align="center">Trip Duration</Typography>
                  </Stack>
                  <Stack spacing={2}>
                      <Chip size="medium" label={"$"+dollarUSLocale.format(Math.round(carboncost))} />
                      <Typography variant="h6" align="center">Total Carbon Cost</Typography>
                  </Stack>
              </Stack>

          </Box>
      </React.Fragment>
  );
}
