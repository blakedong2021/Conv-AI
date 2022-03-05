import React, {useEffect} from 'react'
import {
    Autocomplete,
    Avatar,
    Box,
    TextField
} from '@mui/material';

import { ListItemTextExtended, ListItemSecondaryActionExtended } from 'mui-listitem-extended';
import placeholder from '../assets/placeholder.jpg';
import useData from '../api/airtable';

export default function ProductSelector() {
    const { products, fetchProducts } = useData();

    useEffect(() => {
       async function onInitialize () {
           await fetchProducts();
        }
        onInitialize();
    }, []);
    
    if (!products) return <p>no products available</p>;

    return (
        <Autocomplete
            sx={{ width: 350 }}
            options={products}
            autoHighlight
            getOptionLabel={(p) => p.fields['SKU']}
            renderOption={(props, p) => (
                <Box component="li" {...props}>
                    <Avatar variant="square" src={p.fields['Product Image'] ? p.fields['Product Image'][0].url: ""} sx={{m: 2, width: 56, height: 56}}/>
                    {p.fields['Product Name']} ({p.fields['SKU']})
                </Box>
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
        />
    )
}