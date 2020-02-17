import {fetchProducts} from '../actions/ProductActions/fetchProducts'
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import ProductsTable from './ProductsTable'
import NewProduct from './NewProduct';

function ProductsView(props){
    // useEffect(() => {
    //     if(!props.products.length){
    //         props.fetchProducts()
    //     }
    // },[props])

    return (
        <>
            <NewProduct/>
            <h1>Products</h1>
            <ProductsTable products={props.products} history={props.history}/>
        </>
    );
}

const mapStateToProps = state => {
    return {
        products: state.products
    }
  }

export default connect(mapStateToProps, {fetchProducts})(ProductsView)