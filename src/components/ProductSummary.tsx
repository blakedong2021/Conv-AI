import * as React from 'react';
import {
  Box,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography
 } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const product = {
  name: "N95 Surgical Respirator",
  description: "Medivena Face Mask, Cone, N95 Surgical Respirator, Headbands, NIOSH-Certified, FDA Listed, Foldable",
  sku: "MS8225",
  quantity: 400,
  destination: "Miami, FL",
  weight: 5,
  image: "https://cdn.shopify.com/s/files/1/0352/1069/0696/products/NIOSH_240Pack.png?v=1593614885"
}
export default function ProductSummary() {
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={4}>
        <Box
          component="img"
          sx={{
            pl: 4,
            pr: 4,
            width: 300,
          }}
          src={product.image}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack direction="row" spacing={2} sx={{ mb: 2}}>
          <Typography variant="h6" color="primary">Quantity:</Typography>
          <Typography variant="h6" color="secondary">{product.quantity}</Typography>            
          <Typography variant="h6" color="primary">Destination:</Typography>            
          <Typography variant="h6" color="secondary">{product.destination}</Typography>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography variant="h4" color="secondary">
            <MoreVert color="primary"/>{product.name}<MoreVert color="primary"/>
          </Typography>
          <Typography variant="h6">
            SKU: {product.sku}
          </Typography>    
          <Typography>
            UNIT WEIGHT: {product.weight} kg
          </Typography>                        
        </Stack>          
      </Grid>
    </Grid>    
  );
}
