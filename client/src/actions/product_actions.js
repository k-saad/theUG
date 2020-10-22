import axios from 'axios';

import { GET_PRODUCTS_BY_SALE } from './types';
import { GET_PRODUCT_TYPES } from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';

export const getProducts = () => {
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=100`)
        .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_SALE,
        payload: request
    }
}

export const getProductTypes = () => {
    const request = axios.get(`${PRODUCT_SERVER}/product-type`)
        .then(response => response.data);

    return {
        type:GET_PRODUCT_TYPES,
        payload: request
    }
}