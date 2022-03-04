import * as React from 'react';
import {
  Box,
  Paper,
  Skeleton,
 } from '@mui/material';
 import ExpansionPlaceholder from '../assets/route.svg';
 
export default function ProductSummary() {
  return (
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
  );
}
