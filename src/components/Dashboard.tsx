import * as React from 'react';
import { 
  Stack,
 } from '@mui/material';
 import CalculatorInput from './CalculatorInput';
import ProductSummary, { IProduct } from './ProductSummary';
import SuppliersTable from './SuppliersTable';

let mockup:IProduct = {
  productName: "N95 Surgical Respirator",
  productSku: "MS8226",
  productQuantity: 300,
  productDestination: "Mercy Hospital",
  productUnitWeight: 10,
  productImage: "https://cdn.shopify.com/s/files/1/0352/1069/0696/products/NIOSH_240Pack.png?v=1593614885"
}

export default function Dashboard() {
  const [product, setProduct] = React.useState<IProduct>(mockup);

  function handleDestinationChange(newDestination: string) {setProduct({...product, productDestination: newDestination})}
  function handleQuantityChange(newQuantity: number) {setProduct({...product, productQuantity: newQuantity})}
  function handleSkuChange(newSku: string) {setProduct({...product, productSku: newSku})}

  return (
    <Stack direction="column" spacing={2}>
      <CalculatorInput 
        destinationInput={product.productDestination} 
        onDestinationChanged={handleDestinationChange}
        quantityInput={product.productQuantity}
        onQuantityChanged={handleQuantityChange}        
        skuInput={product.productSku}
        onSkuChanged={handleSkuChange}
      />
      <ProductSummary {...product}/>
      <SuppliersTable productQuantity={product.productQuantity}/>
    </Stack>
  );
}