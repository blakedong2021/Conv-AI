import React, {useEffect, useState} from 'react'
import { 
  Stack,
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
  productDestination: "Mercy Hospital",
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
        options.push(
          {
            supplier: x.supplier,
            origin: ORIGIN_MAP.get(x.supplier) || "",
            unitcost: x.adjustedCost,
            contingencycost: 0,
            co2: 0.05,
            carbonunitcost: 0,
          }
        )
      })
      setSuppliers(options);
    }
  }

  return (
    <Stack direction="column" spacing={2}>
      <CalculatorInput 
        destinationInput={product.productDestination} 
        onDestinationChanged={handleDestinationChange}
        quantityInput={product.productQuantity}
        onQuantityChanged={handleQuantityChange}        
        skuInput={product.productSku}
        onProductChanged={handleProductChange}
      />
      <ProductSummary {...product}/>
      <SuppliersTable productQuantity={product.productQuantity} suppliers={suppliers}/>
    </Stack>
  );
}