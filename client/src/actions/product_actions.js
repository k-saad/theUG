import axios from 'axios';

import { GET_PRODUCTS_BY_SALE, GET_PRODUCTS_BY_ARRIVAL  } from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';

export const getProductBySell = () => {
    const request = axios.get(`${USER_SERVER}/logout`).then(response => response.data);
    return {
        type: GET_PRODUCTS_BY_SALE,
        payload: request
    }
}

export const getProductsByArrival = () => {
    const request = axios.get(`${USER_SERVER}/logout`).then(response => response.data);
    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}