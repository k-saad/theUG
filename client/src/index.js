import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';

import Reducers from './reducers';

import './resources/css/styles.css';  

const Store = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);


ReactDOM.render(
  <Provider store={Store(Reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);
