import { GET_PRODUCTS_BY_SALE } from '../actions/types';
import { GET_PRODUCT_TYPES } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type){
        case GET_PRODUCTS_BY_SALE: 
            return {...state, productsBySale: action.payload}
        case GET_PRODUCT_TYPES:
            return {...state, productTypes: action.payload}
        default:
            return state;
    }
}