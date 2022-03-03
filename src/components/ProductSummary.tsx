import * as React from 'react';
import {
  Grid,
  Paper,
  Skeleton,
 } from '@mui/material';

export default function ProductSummary() {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rectangular" height={250}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" style={{ marginBottom: 6 }}/>
        </Grid>
      </Grid>    
    </Paper>    

  );
}
