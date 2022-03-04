import * as React from 'react';
import { 
  Stack,
 } from '@mui/material';
 import CalculatorInput from './CalculatorInput';
import ProductSummary from './ProductSummary';
import SuppliersTable from './SuppliersTable';

export default function Dashboard() {
  return (
    <Stack direction="column" spacing={2}>
      <CalculatorInput/>
      <ProductSummary/>
      <SuppliersTable/>
    </Stack>
  );
}