import * as React from 'react';
import { 
  Stack,
 } from '@mui/material';
 import CalculatorInput from './CalculatorInput';
import ProductSummary, { IProduct } from './ProductSummary';
import SuppliersTable from './SuppliersTable';



let mockup:IProduct = {
  productName: "Face Mask, Cone, N95 Surgical",
  productSummary: "Mask, N95 Surgical Respirator, NIOSH-Certified, FDA and DCD-Listed, Foldable-Design, 20/bx, 20bx/cs",
  productSku: "MDI MS8225",
  productQuantity: 300,
  productDestination: "Mercy Hospital",
  productUnitWeight: 10,
  productImage: "https://cdn.shopify.com/s/files/1/0352/1069/0696/products/NIOSH_240Pack.png?v=1593614885"
}

export default function Dashboard() {
  const [product, setProduct] = React.useState<IProduct>(mockup);

  function handleDestinationChange(newDestination: string) {setProduct({...product, productDestination: newDestination})}
  
  function handleQuantityChange(newQuantity: number) {setProduct({...product, productQuantity: newQuantity})}
  
  function handleProductChange(newProduct: any) {
    setProduct({
      ...product, 
      productName: newProduct.name, 
      productSummary: newProduct.description,
      productSku: newProduct.sku,
      productUnitWeight: newProduct.unitWeight,
      productImage: newProduct.image,
    });
    console.log("New Product Selected: " + newProduct);
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
      <SuppliersTable productQuantity={product.productQuantity}/>
    </Stack>
  );
}