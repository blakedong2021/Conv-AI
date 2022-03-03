import * as React from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Skeleton,
  Slider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
 } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SupplierDetails from './SupplierDetails';


function createData(
  supplier: string,
  origin: string,
  unitcost: number,
  ordercost: number,
  contingencycost: number,
  carboncost: number,
  totalcost: number,
) {
  return {
    supplier,
    origin,
    unitcost,
    ordercost,
    contingencycost,
    carboncost,
    totalcost,
  };
}

const rows = [
  createData('Salud Medical Supply', 'Mexico City', 395.20, 118560, 1500, 150, 118710),
  createData('Shamrock Hospital Supply', 'Dublin', 386.40, 115920, 2500, 200, 116120),
  createData('Tokyo Medical Solutions', 'Tokyo', 402.86, 120858, 3000, 250, 121108),
  createData('Lone Star Medical', 'Irving', 415.00, 130520, 500, 50, 119710),
];

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  let dollarUSLocale = Intl.NumberFormat('en-US');

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.supplier}
        </TableCell>
        <TableCell align="center">{row.origin}</TableCell>
        <TableCell align="center">${row.unitcost.toFixed(2)}</TableCell>
        <TableCell align="center">${dollarUSLocale.format(row.ordercost)}</TableCell>
        <TableCell align="center">${dollarUSLocale.format(row.contingencycost)}</TableCell>
        <TableCell align="center">${dollarUSLocale.format(row.carboncost)}</TableCell>
        <TableCell align="center">${dollarUSLocale.format(row.totalcost)}</TableCell>                
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <SupplierDetails/>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const premiumTicks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 300,
    label: '300%',
  },
]

const carbonTicks = [
  {
    value: 0,
    label: '$0',
  },
  {
    value: 100,
    label: '$100',
  },
  {
    value: 200,
    label: '$200',
  },
  {
    value: 300,
    label: '$300',
  },      
];

function valuetext(value: number) {
  return `${value}`;
}

function valueLabelFormat(value: number) {
  console.log("valuelabel: " +  value)
  return `${value}`;
}

export default function SuppliersTable() {
  return (
      <Stack
        direction="column"
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Stack direction="row" alignItems="center" component={Paper}>
          <Box sx={{ width: '50%', margin: 5 }}>
            <Typography gutterBottom>
              CARBON COST
            </Typography>
            <Slider
              min={0}
              max={300}
              aria-label="CARBON COST"
              defaultValue={50}
              valueLabelFormat={valueLabelFormat}
              getAriaValueText={valuetext}
              step={50}
              valueLabelDisplay="on"
              marks={carbonTicks}
              color="secondary"
            />
          </Box>
          <Box sx={{ width: '50%', margin: 5 }}>
            <Typography gutterBottom>
              ALTERNATIVE PREMIUM
            </Typography> 
            <Slider
              min={0}
              max={300}            
              aria-label=""
              defaultValue={50}
              valueLabelFormat={valueLabelFormat}
              getAriaValueText={valuetext}
              step={50}
              valueLabelDisplay="on"
              color="secondary"
              marks={premiumTicks}
            />
          </Box>
        </Stack>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>SUPPLIER</TableCell>
                <TableCell align="center">ORIGIN</TableCell>
                <TableCell align="center">UNIT COST</TableCell>
                <TableCell align="center">ORDER COST</TableCell>
                <TableCell align="center">CONTINGENCY COST</TableCell>
                <TableCell align="center">CARBON COST</TableCell>
                <TableCell align="center">TOTAL COST</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.supplier} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Stack>
  );
}
