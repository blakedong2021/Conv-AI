import * as React from 'react';
import {
  Box,
  Paper,
  Skeleton,
 } from '@mui/material';
 import ExpansionPlaceholder from '../assets/supplier_expand.png';
 
export default function ProductSummary() {
  return (
    <Box
      component="img"
      sx={{
        pl: 4,
        pr: 4,
      }}
      alt="SUPPLIER ROUTES"
      src={ExpansionPlaceholder}
    />
  );
}
