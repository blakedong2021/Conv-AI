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
                    return (
                        <React.Fragment key={p.id}>
                            <Divider/>
                            <ListItem>
                                <ListItemAvatar> 
                                    <Avatar variant="square" src={placeholder} />
                                </ListItemAvatar>
                                <ListItemTextExtended 
                                    overline={p.fields['Category Name']}
                                    primary={"sku: " + p.fields['SKU']} 
                                    secondary={"origin: " + p.fields['Source Location']}
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