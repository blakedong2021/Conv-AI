import * as React from 'react';
import {
  Box,
  Grid,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography
 } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const destinations = [
  "Mercy Hospital",
  "Aventura Hospital and Medical Center",
  "Kendall Regional Medical Center",
  "Belton Regional Medical Center",
  "Centerpoint Medical Center",
  "Lafayette Regional Health Center",
  "Lee’s Summit Medical Center",
  "Research Medical Center",
];

export default function CalculatorInput() {
  const [destination, setDestination] = React.useState('Mercy Hospital');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  return (
    <Stack direction="row" spacing={6} alignItems="center" sx={{m: 5}}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{width: "33%"}}>
        <TextField 
          select
          label="Select"
          value={destination}
          onChange={handleChange}
        >
          {destinations.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Typography>Destination</Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" sx={{width: "33%"}}>
        <TextField value={"MS8225"}></TextField>
        <Typography>Product SKU</Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" sx={{width: "33%"}}>
        <TextField value={300}></TextField>
        <Typography>Quantity</Typography>
      </Stack>  
    </Stack>
  );
}
