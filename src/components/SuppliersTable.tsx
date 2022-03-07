import React, { useState, useEffect }  from 'react';
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

export type Supplier = {
  supplier: string;
  origin: string;
  unitcost: number;
  unitweight: number;
  contingencycost: number;
  co2: number;
  carbonunitcost: number;
  distance: number;
  deliveryrisk: number;
};

function SupplierRow(props: { row: Supplier, orderQuantity: number, destination: string }) {
  const { row, orderQuantity, destination } = props;
  const [open, setOpen] = React.useState(false);

  let dollarUSLocale = Intl.NumberFormat('en-US');
  let ordercost = row.unitcost * orderQuantity;
  let contingencycost = row.contingencycost;
  let carboncost = row.carbonunitcost * row.co2 * orderQuantity;
  let totalcost = ordercost + contingencycost + carboncost;
  let totalWeight = row.unitweight *orderQuantity;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            sx={{color: 'common.black', backgroundColor: 'secondary.main', '&:hover': {backgroundColor: 'common.white'}}}
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
            <SupplierDetails
              supplier={row.supplier}
              distance={row.distance}
              weight={totalWeight} 
              duration={"N/A"} 
              carboncost={carboncost}
            />
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

const generatedSupplierData:Array<Supplier> = [
  {supplier: 'Salud Medical Supply', origin: 'Dublin', unitcost: 386.40, unitweight: 1, contingencycost: 8892, co2: 0.02245, carbonunitcost: CARBON_UNITCOST, distance: 1494, deliveryrisk: 0.05},
];

export interface ISupplierInput {
  destination: string;
  productQuantity: number;
  suppliers: Array<Supplier>;
}

export default function SuppliersTable({destination, productQuantity, suppliers}:ISupplierInput) {
  const [orderQuantity, setOrderQuantity] = React.useState<number>(productQuantity);
  const [supplierData, setSupplierData] = React.useState<Array<Supplier>>(generatedSupplierData);
  const [carbonCost, setCarbonCost] = React.useState<number | Array<number>>(CARBON_UNITCOST);
  const [alternativePremium, setAlternativePremium] = React.useState<number | Array<number>>(ALTERNATIVE_PREMIUMCOST);

  useEffect(() => {
    // console.log(`Quantity/Supplier update: ${productQuantity}, suppliers: ${JSON.stringify(suppliers)}`);
    setOrderQuantity(productQuantity);

    suppliers.forEach(x =>  {
      let premiumModifier = 1+Number(alternativePremium)/100;
      let riskCost = productQuantity*x.unitcost*x.deliveryrisk;
      x.contingencycost = riskCost*premiumModifier;

      // console.log(`${x.supplier} order cost: ${x.unitcost*orderQuantity} | contingency: ${ x.contingencycost} | carboncost: ${x.carbonunitcost*x.co2*orderQuantity}`);
    })

    // sort the suppliers based on total cost
    suppliers.sort((a:Supplier, b:Supplier) => {
      let totalA = a.unitcost*orderQuantity+a.contingencycost+a.carbonunitcost*a.co2*orderQuantity;
      let totalB = b.unitcost*orderQuantity+b.contingencycost+b.carbonunitcost*b.co2*orderQuantity;

      return totalA - totalB;
    })

    setSupplierData(suppliers);
  }, [productQuantity, suppliers, alternativePremium, carbonCost]);

  function valuetext(value: number) {
    return `${value}`;
  }
  
  function valueLabelFormat(value: number) {
    return `${value}`;
  }

  const handleCarbonCostChange = (event: Event, newValue: number | number[]) => {
    supplierData.forEach(x =>  {
      x.carbonunitcost = Number(newValue);
    });
    setSupplierData(supplierData);    
    setCarbonCost(newValue);
  };

  const handleAlternativePremiumChange = (event: Event, newValue: number | number[]) => {
    let premiumModifier = newValue === 0 ? 0 : 1+Number(newValue)/100;

    supplierData.forEach(x =>  {
      let riskCost = orderQuantity*x.unitcost*x.deliveryrisk;
      x.contingencycost = riskCost*premiumModifier;
    });    
    setAlternativePremium(newValue);    
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
                <SupplierRow key={row.supplier} row={row} orderQuantity={orderQuantity} destination={destination}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Stack>
  );
}
