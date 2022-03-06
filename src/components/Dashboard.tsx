import React, {useEffect, useState} from 'react'
import {
  Box,
  Button,
  Stack, 
  Typography,
 } from '@mui/material';
 import CalculatorInput from './CalculatorInput';
import ProductSummary, { IProduct } from './ProductSummary';
import SuppliersTable, { Supplier } from './SuppliersTable';
import { useModel } from '../api/airtable';


let mockup:IProduct = {
  productName: "Face Mask, Cone, N95 Surgical",
  productSummary: "Mask, N95 Surgical Respirator, NIOSH-Certified, FDA and DCD-Listed, Foldable-Design, 20/bx, 20bx/cs",
  productSku: "MDI MS8225",
  productQuantity: 300,
  productDestination: "Miami",
  productUnitWeight: 10,
  productImage: "https://cdn.shopify.com/s/files/1/0352/1069/0696/products/NIOSH_240Pack.png?v=1593614885"
}

const ORIGIN_MAP = new Map<string, string>();
ORIGIN_MAP.set('Salud Medical Supply', 'Mexico City');
ORIGIN_MAP.set('Shamrock Hospital Supply', 'Dublin');
ORIGIN_MAP.set('Tokyo Health Solutions', 'Tokyo');
ORIGIN_MAP.set('Lone Star Medical', 'Irving');

export default function Dashboard() {
  const [product, setProduct] = React.useState<IProduct>(mockup);
  const [suppliers, setSuppliers] = React.useState<Array<Supplier>>([]);
  const {model, fetchModel } = useModel();
  const [waitingForInput, setWaitingForInput] = React.useState<boolean>(true);

  useEffect(() => {
     async function onInitialize () {
         await fetchModel();
      }
      onInitialize();
  }, []);
  
  if (!model) return <h1>loading AI model</h1>;

  function handleDestinationChange(newDestination: string) {setProduct({...product, productDestination: newDestination})}
  
  function handleQuantityChange(newQuantity: number) {setProduct({...product, productQuantity: newQuantity})}
  
  function handleProductChange(selectedProducts: any) {
    // this event will deliver list of products from suppliers, just use the first product detail since we assume 
    // product details are the same, just different suppliers and unit cost
    if (selectedProducts && selectedProducts.length > 0) {
      let newProduct = selectedProducts[0];
      setProduct({
        ...product, 
        productName: newProduct.name, 
        productSummary: newProduct.description,
        productSku: newProduct.sku,
        productUnitWeight: newProduct.unitWeight,
        productImage: newProduct.image,
      });
      console.log("New Product Selected: " + newProduct.name);
  
      let options:Array<Supplier> = [];
      selectedProducts.forEach((x:any) =>  {
        // first look up the route based on Sku and Destination
        let routeInfo = model.filter((route:any) => (route.sku == x.id && route.destination == product.productDestination)) || null;
        let co2 = routeInfo[0] ? routeInfo[0]['co2'] : 0;
        let totalDistance = routeInfo[0] ? routeInfo[0]['totalDistance'] : 0;
        console.log("Route details: " + JSON.stringify(routeInfo[0]));
        options.push(
          {
            supplier: x.supplier,
            origin: ORIGIN_MAP.get(x.supplier) || "",
            unitcost: x.adjustedCost,
            unitweight: x.unitWeight,
            contingencycost: 0,
            co2: co2,
            carbonunitcost: 100,
            distance: totalDistance,
          }
        )
      })
      setSuppliers(options);
    }
  }

  return (
    <Stack direction="column" spacing={2}>
      {waitingForInput ? (
        <Typography variant="h5" color="secondary" sx={{m: 6}}>
          Enter your data below to compare your total delivered cost by supplier.
        </Typography>
      ) : (<></>)}

      <CalculatorInput 
        destinationInput={""} 
        onDestinationChanged={handleDestinationChange}
        quantityInput={NaN}
        onQuantityChanged={handleQuantityChange}        
        skuInput={""}
        onProductChanged={handleProductChange}
      />          

      {waitingForInput ? (
        <Box component="div" sx={{display: "flex", alignItems: "flex-end", justifyContent: "flex-end"}}>  
          <Button 
            variant="contained" 
            color="secondary" 
            sx={{m:6, width:"100px", height:"50px"}}
            onClick={() => {
              if (suppliers.length > 0 && product && product.productQuantity > 0) 
                setWaitingForInput(false);
            }}
          >
            Enter
          </Button>
        </Box>
      ) : (<></>)}

      {!waitingForInput ? (     
        <Box>     
          <ProductSummary 
            {...product}
          />        
          <SuppliersTable 
            destination={product.productDestination} 
            productQuantity={product.productQuantity} 
            suppliers={suppliers}
          />
        </Box>            
      ) : (<></>)}          

    </Stack>
  );
}