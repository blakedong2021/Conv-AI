import React, {useEffect} from 'react'
import { 
    Box, 
    List, 
    ListItem,
    ListItemButton, 
    Divider, 
    ListItemIcon, 
    IconButton,
    Switch,
    ListItemAvatar,
    Avatar,
    Checkbox,
    Typography
} from '@mui/material';

import { ListItemTextExtended, ListItemSecondaryActionExtended } from 'mui-listitem-extended';
import placeholder from '../assets/placeholder.jpg';
import useData from '../api/airtable';

const ProductList = () => {
    const { products, fetchProducts } = useData();

    useEffect(() => {
       async function onPageLoad () {
           await fetchProducts();
        }
      onPageLoad();
    }, []);
    
    if (!products || products.length === 0) return <p>no products available</p>;

    return (
        <Box>
            <List>
                {products.map((p) => {
                    var img = p.fields['Product Image'].length > 0 ? p.fields['Product Image'][0].url: ""
                    return (
                        <React.Fragment key={p.id}>
                            <Divider/>
                            <ListItem>
                                <ListItemAvatar> 
                                    <Avatar variant="square" src={img} />
                                </ListItemAvatar>
                                <ListItemTextExtended 
                                    overline={p.fields['Supplier']}
                                    primary={p.fields['Product Name']} 
                                    secondary={"Sku: " + p.fields['SKU']}
                                />
                                <ListItemSecondaryActionExtended>
                                    <Switch/>
                                </ListItemSecondaryActionExtended>
                            </ListItem>
                        </React.Fragment>                         
                    );
                })}      
            </List>
        </Box>
    )
}

export default ProductList;