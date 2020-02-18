import React, {useState} from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import OrderRow from './OrderRow'

function OrdersTable({orders, history}){
    const renderOrders = () => orders.map((o) => <OrderRow key={o.orderID} order={o}  handleSelect={(id) => history.push(`/orders/${id}`)}/>)

    
    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Order STATUS</th>
                    <th>Order Number</th>
                    <th>Date Ordered</th>
                    <th>Customer Name</th>
                    <th>Customer Address</th>
                    {/* <th>Product Description</th> */}
                    {/* <th>Total Inventory</th> */}
                </tr>
            </thead>
            <tbody>
                {renderOrders()}
            </tbody>
        </Table>
    );
}


export default connect(null, {})(OrdersTable)