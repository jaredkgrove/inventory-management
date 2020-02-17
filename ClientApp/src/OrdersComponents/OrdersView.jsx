
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import OrdersTable from './OrdersTable'
import NewOrder from './NewOrder';

function OrdersView(props){
    return (
        <>
            <NewOrder/>
            <h1>Orders</h1>
            <OrdersTable orders={props.orders} history={props.history}/>
        </>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.orders,
        products: state.products
    }
  }

export default connect(mapStateToProps)(OrdersView)