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
  const [productQuantity, setProductQuantity] = React.useState(400);
  const [productSku, setProductSku] = React.useState('MS8225');

  const handleDestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let qty = Number(event.target.value);
    if (!isNaN(qty)) {
      setProductQuantity(qty);
    }
  };

  const handleSkuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductSku(event.target.value);
  };

  return (
    <Box component="form" noValidate autoComplete="off"> 
      <Stack direction="row" spacing={6} alignItems="center" sx={{m: 5}}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{width: "33%"}}>
          <TextField 
            select
            label="Select"
            value={destination}
            onChange={handleDestChange}
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
          <TextField 
            value={productSku}
            onChange={handleSkuChange}
          />
          <Typography>Product SKU</Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" sx={{width: "33%"}}>
          <TextField 
            type="number"
            value={productQuantity}
            onChange={handleQuantityChange}
          />
          <Typography>Quantity</Typography>
        </Stack>  
      </Stack>
    </Box>
  );
}
