import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';


import productsReducer from './reducers/productsReducer'; 
import currentProductReducer from './reducers/currentProductReducer'; 
import binsReducer from './reducers/binsReducer'; 
import currentBinReducer from './reducers/currentBinReducer'; 
import ordersReducer from './reducers/ordersReducer'; 
import currentOrderReducer from './reducers/currentOrderReducer'
import inventoriesReducer from './reducers/inventoriesReducer'; 


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

// import currentSketchReducer from './reducers/currentSketchReducer.js'; 
// import sketchSettingsReducer from './reducers/sketchSettingsReducer.js'; 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers({products: productsReducer, currentProduct: currentProductReducer, bins: binsReducer, currentBin: currentBinReducer, orders: ordersReducer, currentOrder: currentOrderReducer, inventories: inventoriesReducer})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={baseUrl}>
        <Route path="/:filter?" component={App} />
    </BrowserRouter>
  </Provider>
  ,
  rootElement);

// registerServiceWorker();

