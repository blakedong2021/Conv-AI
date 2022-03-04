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

export interface IProduct {
  productSku: string;
  productDestination: string;
  productQuantity: number;
  productName: string;
  productUnitWeight: number;
  productImage: string;
}

export default function ProductSummary(props:IProduct) {
  const {productSku, productDestination, productQuantity, productName, productUnitWeight, productImage} = props;
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
          src={productImage}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack direction="row" spacing={2} sx={{ mb: 2}}>
          <Typography variant="h6" color="primary">Quantity:</Typography>
          <Typography variant="h6" color="secondary">{productQuantity}</Typography>            
          <Typography variant="h6" color="primary">Destination:</Typography>            
          <Typography variant="h6" color="secondary">{productDestination}</Typography>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography variant="h4" color="secondary">
            <MoreVert color="primary"/>{productName}<MoreVert color="primary"/>
          </Typography>
          <Typography variant="h6">
            SKU: {productSku}
          </Typography>    
          <Typography>
            UNIT WEIGHT: {productUnitWeight} kg
          </Typography>                        
        </Stack>          
      </Grid>
    </Grid>    
  );
}
