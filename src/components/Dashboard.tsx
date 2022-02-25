import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

function DashboardContent() {
  const iframetag = <div dangerouslySetInnerHTML={{ __html: 
    '<iframe class="airtable-embed" src="https://airtable.com/embed/shrXOnV2TfiovqOnv?backgroundColor=green" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>'
  }} />;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" style={{ marginBottom: 6 }}/>
          <Skeleton variant="rectangular" height={500}/>
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" style={{ marginBottom: 6 }}/>
          <Skeleton variant="rectangular" height={500}/>
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          {iframetag}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
