import React, {useEffect, useState} from 'react'
import {
    Autocomplete,
    Avatar,
    Box,
    TextField
} from '@mui/material';

import { useProducts } from '../api/airtable';

export interface IProductSelector {
    onProductSelectionChanged: (product: any) => void,
}

export default function ProductSelector({onProductSelectionChanged}:IProductSelector) {
    const { products, fetchProducts } = useProducts();

    useEffect(() => {
       async function onInitialize () {
           await fetchProducts();
        }
        onInitialize();
    }, []);
    
    if (!products) return <p>fetching products</p>;

    function handleProductSelectionChange(event, value, reason) {
        // Filtering by SKU will result in a list of products from various supppliers
        let selections =  products.filter(p => p.sku == value);
        // console.log("Product selection: " + JSON.stringify(selection[0]));

        onProductSelectionChanged(selections);
    }

    return (
        <Autocomplete
            sx={{ width: 350 }}
            options={products}
            autoHighlight
            getOptionLabel={(option) => option.sku}
            renderOption={(props, option) => (
                <li {...props} key={option.id} >
                    <Avatar variant="square" src={option.image} sx={{m: 2, width: 56, height: 56}}/>
                    {option.name} ({option.sku})
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a product"
                    inputProps={{
                        ...params.inputProps,
                    }}
                />
            )}
            onInputChange={handleProductSelectionChange}
        />
    )
}