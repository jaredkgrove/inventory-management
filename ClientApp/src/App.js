import React, { useEffect } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import {fetchProducts} from './actions/ProductActions/fetchProducts'
import {fetchBins} from './actions/BinActions/fetchBins'
import {fetchOrders} from './actions/OrderActions/fetchOrders'
import { connect } from 'react-redux';


import './custom.css'
import ProductsView from './ProductsComponents/ProductsView';
import ProductDetailsView from './ProductsComponents/ProductDetailsView';
import BinsView from './BinsComponents/BinsView';
import BinDetailsView from './BinsComponents/BinDetailsView';
import OrdersView from './OrdersComponents/OrdersView'
import OrderDetailsView from './OrdersComponents/OrderDetailsView';

const App = (props) => {
    useEffect(() => {
      if(!props.products.length){
          props.fetchProducts()
      }
      if(!props.bins.length){
        props.fetchBins()
      }
      if(!props.orders.length){
        props.fetchOrders()
      }
    },[])

    return (
      <Layout>
        <Route exact path='(/|/Products)' render= {routerProps => <ProductsView {...routerProps} />} />
        <Route exact path='/Products/:productID' render= {routerProps => <ProductDetailsView {...routerProps} />} />
        <Route exact path='/Bins' render= {routerProps => <BinsView {...routerProps} />} />
        <Route exact path='/Bins/:binID' render= {routerProps => <BinDetailsView {...routerProps} />} />
        <Route exact path='/Orders' render= {routerProps => <OrdersView {...routerProps} />} />
        <Route exact path='/Orders/:orderID' render= {routerProps => <OrderDetailsView  {...routerProps} />} />
      </Layout>
    );
}

const mapStateToProps = state => {
  return {
      products: state.products,
      bins: state.bins,
      orders: state.orders
  }
}

export default connect(mapStateToProps, {fetchProducts, fetchBins, fetchOrders})(App)