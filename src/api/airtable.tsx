import { useState }  from 'react';
import axios, { HeadersDefaults, AxiosResponse } from 'axios';
import Airtable from 'airtable';

const API_KEY = 'keyIrsEq6AzAwrvLx';
const BASE_ID = 'appo7bWkYvpGfKHSg';

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: API_KEY
});
const base = Airtable.base(BASE_ID);

//base endpoint to call with each request
axios.defaults.baseURL = `https://api.airtable.com/v0/${BASE_ID}`;

//content type to send with all POST requests 
axios.defaults.headers.post['Content-Type'] = 'application/json';

//authenticate to the base with the API key 
interface CommonHeaderProperties extends HeadersDefaults {
    Authorization: string;
}
 
axios.defaults.headers = {
    Authorization: `Bearer ${API_KEY}`
} as CommonHeaderProperties;

export function useProducts() {
    const [products, setProducts] = useState(null);
   
    const fetchProducts = async () => {

        return axios.get('/products').then(res => {
            const transformed = res.data.records.map((p: any) => {
                return {
                    id: p.id,
                    sku: p.fields['SKU'],
                    image: p.fields['Product Image'] ? p.fields['Product Image'][0].url: "",
                    name: p.fields['Product Name'],
                    description: p.fields['Product Description'],
                    category: p.fields['Category Name'],
                    supplier: p.fields['Supplier'],
                    unitCost: p.fields['Unit Cost'],
                    costMultiplier: p.fields['Cost Multiplier'],
                    adjustedCost: p.fields['Adjusted Cost'],
                    unitWeight: p.fields['Unit Weight'],
                    orders: p.fields['Orders'],
                };
            })

            setProducts(transformed);
            // console.log("Airtable Products: ", transformed);
        });
    }
    
    return { fetchProducts, products }
}

export function useModel() {
    const [model, setModel] = useState(null);
   
    const fetchModel = async () => {

        return axios.get('/models').then(res => {
            const transformed = res.data.records.map((p: any) => {
                return {
                    id: p.id,
                    sku: p.fields['SKU'][0],
                    supplier: p.fields['Supplier'][0],
                    destination: p.fields['Destination'],
                    totalDistance: p.fields['Total Distance'],
                    co2: p.fields['Metric Tons CO2 per Unit'],
                };
            })

            setModel(transformed);
            console.log("Airtable Model: ", transformed);
        });
    }
    
    return { fetchModel, model }
}