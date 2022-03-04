import * as React from 'react';
import { styled } from '@mui/material/styles';
// import { tableCellClasses } from '@mui/material/TableCell';
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
  tableCellClasses,  
  TableContainer,
  TableHead,
  TableRow,
  Typography,
 } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SupplierDetails from './SupplierDetails';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
}));

const CARBON_UNITCOST = 100;
const ALTERNATIVE_PREMIUMCOST = 50;

function createData(
  quantity: number,
  supplier: string,
  origin: string,
  unitcost: number,
  contingencycost: number,
  co2: number,
  carbonunitcost: number
) {
  return {
    quantity,
    supplier,
    origin,
    unitcost,
    contingencycost,
    co2,
    carbonunitcost,
  };
}

function SupplierRow(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  let dollarUSLocale = Intl.NumberFormat('en-US');
  const deliveryrisk = 0.05;
  let ordercost = row.unitcost*row.quantity;
  let contingencycost = row.contingencycost*deliveryrisk;
  let carboncost = row.unitcost*row.co2*row.carbonunitcost;
  let totalcost = ordercost+contingencycost+carboncost;

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
        <TableCell align="center">${dollarUSLocale.format(Math.round(ordercost))}</TableCell>
        <TableCell align="center">${dollarUSLocale.format(Math.round(contingencycost))}</TableCell>
        <TableCell align="center">${dollarUSLocale.format(Math.round(carboncost))}</TableCell>
        <TableCell align="center">${dollarUSLocale.format(Math.round(totalcost))}</TableCell>                
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

const altPremiumTicks = [
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

const generatedSupplierData = [
  createData(400, 'Salud Medical Supply', 'Mexico City', 395.20, 1500, 0.2245, CARBON_UNITCOST),
  createData(400, 'Shamrock Hospital Supply', 'Dublin', 386.40, 1200, 0.03308951, CARBON_UNITCOST),
  createData(400, 'Tokyo Medical Solutions', 'Tokyo', 402.86, 3000, 0.0680458,  CARBON_UNITCOST),
  createData(400, 'Lone Star Medical', 'Irving', 415.00, 500, 0.0443186, CARBON_UNITCOST)
];

export default function SuppliersTable() {
  const [supplierData, setSupplierData] = React.useState(generatedSupplierData);
  const [productQuantity, setProductQuantity] = React.useState<number>(400);
  const [carbonCost, setCarbonCost] = React.useState<number | Array<number>>(CARBON_UNITCOST);
  const [alternativePremium, setAlternativePremium] = React.useState<number | Array<number>>(ALTERNATIVE_PREMIUMCOST);


  function valuetext(value: number) {
    return `${value}`;
  }
  
  function valueLabelFormat(value: number) {
    return `${value}`;
  }

  const handleCarbonCostChange = (event: Event, newValue: number | number[]) => {
    setCarbonCost(newValue);
    supplierData.forEach(x =>  {
      x.carbonunitcost = Number(newValue);
    });
    console.log("New supplier data: " + JSON.stringify(supplierData));
  };

  const handleAlternativePremiumChange = (event: Event, newValue: number | number[]) => {
    setAlternativePremium(newValue);
    let premiumModifier = Number(newValue)/100;
    supplierData.forEach(x =>  {
      x.contingencycost = x.quantity*x.unitcost*premiumModifier;
    });    
  };

  return (
      <Stack
        direction="column"
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Stack direction="row" alignItems="center">
          <Box sx={{ width: '50%', margin: 5 }}>
            <Typography gutterBottom>
              CARBON COST ($/Ton)
            </Typography>
            <Slider
              min={0}
              max={300}
              aria-label="CARBON COST"
              value={carbonCost}
              valueLabelFormat={valueLabelFormat}
              getAriaValueText={valuetext}
              step={10}
              valueLabelDisplay="on"
              marks={carbonTicks}
              color="secondary"
              onChange={handleCarbonCostChange}
            />
          </Box>
          <Box sx={{ width: '50%', margin: 5 }}>
            <Typography gutterBottom>
              ALTERNATIVE PREMIUM (% Unit Cost)
            </Typography> 
            <Slider
              min={0}
              max={300}            
              aria-label=""
              value={alternativePremium}
              valueLabelFormat={valueLabelFormat}
              getAriaValueText={valuetext}
              step={10}
              valueLabelDisplay="on"
              color="secondary"
              marks={altPremiumTicks}
              onChange={handleAlternativePremiumChange}
            />
          </Box>
        </Stack>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell>SUPPLIER</StyledTableCell>
                <StyledTableCell align="center">ORIGIN</StyledTableCell>
                <StyledTableCell align="center">UNIT COST</StyledTableCell>
                <StyledTableCell align="center">ORDER COST</StyledTableCell>
                <StyledTableCell align="center">CONTINGENCY COST</StyledTableCell>
                <StyledTableCell align="center">CARBON COST</StyledTableCell>
                <StyledTableCell align="center">TOTAL COST</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {supplierData.map((row) => (
                <SupplierRow key={row.supplier} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Stack>
  );
}
