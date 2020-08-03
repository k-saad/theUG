import axios from 'axios';

import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from './types';

import { USER_SERVER } from '../components/utils/misc';

//login
export const loginUser = (userData) => {
    console.log('userdata', userData);

    const request = axios.post(`${USER_SERVER}/login`,userData)
        .then(response=>response.data);
    
    return {
        type: LOGIN_USER,
        payload: request
    }
};

//registration
export const registerUser = (userData) => {

    const request = axios.post(`${USER_SERVER}/register`,userData).then( response => response.data );
    
    return {
        type: REGISTER_USER,
        payload: request
    }
};

//authentication
export const authenticateUser = () => {
    const request = axios.get(`${USER_SERVER}/auth`).then(response => response.data);
    return {
        type: AUTH_USER,
        payload: request
    }
} 

export const logoutUser = () => {
    console.log('trying to logout')

    const request = axios.get(`${USER_SERVER}/logout`).then(response => response.data);
    return {
        type: LOGOUT_USER,
        payload: request
    }
}