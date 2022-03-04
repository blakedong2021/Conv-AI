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

export interface ICalculatorInput {
  destinationInput: string,
  onDestinationChanged: (newDestination: string) => void,
  quantityInput: number,
  onQuantityChanged: (newQuantity: number) => void,  
  skuInput: string,
  onSkuChanged: (newSku: string) => void,
}

export default function CalculatorInput({destinationInput, onDestinationChanged, quantityInput, onQuantityChanged, skuInput, onSkuChanged}:ICalculatorInput) {
  const [destination, setDestination] = React.useState(destinationInput);
  const [productQuantity, setProductQuantity] = React.useState(quantityInput);
  const [productSku, setProductSku] = React.useState(skuInput);

  const handleDestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    destinationInput = event.target.value;
    setDestination(destinationInput);
    onDestinationChanged(destinationInput);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let qty = 0;
    if (event.target.value) {
      qty = Number(event.target.value);
      setProductQuantity(qty);
      onQuantityChanged(qty);
    }
  };

  const handleSkuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    skuInput = event.target.value;
    setProductSku(skuInput);
    onSkuChanged(skuInput);
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
