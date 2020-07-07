import axios from 'axios';

import { LOGIN_USER } from './types';

import { USER_SERVER } from '../components/utils/misc';


export const loginUser = (userData) => {
    console.log('userdata', userData);

    const request = axios.post(`${USER_SERVER}/login`,userData)
        .then(response=>response.data);
    
    return {
        type: LOGIN_USER,
        payload: request
    }
};