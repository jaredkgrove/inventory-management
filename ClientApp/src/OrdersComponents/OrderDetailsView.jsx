import {fetchCurrentOrder} from '../actions/OrderActions/fetchCurrentOrder'
import {fetchInventories} from '../actions/InventoryActions/fetchInventories'
import {deleteOrder} from '../actions/OrderActions/deleteOrder'
import {fillOrder} from '../actions/OrderActions/fillOrder'
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import FillOrderInput from './FillOrderInput';

function OrderDetailsView({order, match, fetchCurrentOrder, fetchInventories, fillOrder, deleteOrder, history, inventories}){
    const [fillData, setFillData] = useState([])
    useEffect(() => {
        if(order.orderID !== match.params.orderID){
            fetchCurrentOrder(match.params.orderID)
            fetchInventories()
        }
    },[])

    // useEffect(() => {
    //     if(order.orderLines && binIDs.length === 0){
            
    //         setBinIDs(Array.apply(null, {length: order.orderLines.count}).map((i, value) => {return {orderLineID: i}}))
    //     }
    // }, [order]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(order.orderLines.every(ol => fillData.find(fd => fd.orderLineID === ol.orderLineID))){
            fillOrder(order.orderID,{orderID: order.orderID, fillOrderLines: fillData})
        }
    }

    const updateFillData = (olID, inventoryID) => {
        let index = fillData.findIndex(fd => fd.orderLineID === olID)
        if(index >= 0){
            let updatedFillData = [...fillData.slice(0, index), {orderLineID: olID, inventoryID: inventoryID}, ...fillData.slice(index + 1)]
            setFillData(updatedFillData)
        }else{
            let updatedFillData = [...fillData, {orderLineID: olID, inventoryID: inventoryID}]
            setFillData(updatedFillData)
        }
    }

    const renderOrderLines = () =>  {
        return( order.orderLines.map(ol => {
                return (
                    <tr>
                        <td>{ol.productDescription}</td>
                        <td>{ol.sku}</td>
                        <td>{ol.qty}</td>
                        {order.orderFilled ? '':<td><FillOrderInput updateFillData={updateFillData}  inventories={inventories.filter(i => i.productID === ol.productID && i.qty >= ol.qty)} orderLineID={ol.orderLineID}/></td>}
                    </tr>
                )})
        )
    }
  

    const renderOrderInfo = () => {
            return (
                <>
                    <h1>{order.orderNumber}</h1>
                    <h6>Status: {order.orderFilled ? 'FILLED':'OPEN'}</h6>
                    <p>Date Ordered: {order.dateOrdered}</p>
                    <p>Customer: {order.customerName}</p>
                    <p>Address: {order.customerAddress}</p>
                </>
            )
    }

    return (
        <>
        <Button variant="danger" onClick={() => {deleteOrder(order.orderID); history.push("/Orders");}}>Delete</Button>
        {renderOrderInfo()}
        <h3>Order Lines</h3>
        <form onSubmit={handleSubmit}>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>QTY</th>
                </tr>
            </thead>
            <tbody>
                {renderOrderLines()}
            </tbody>
        </Table>
        {order.orderFilled ? '':<Button type="submit">Fill Order From Bin</Button>}
        </form>
        {/* {Table for open orders} */}
</>
    );
}

const mapStateToProps = state => {
    return {
        order: state.currentOrder,
        inventories: state.inventories
    }
  }

export default connect(mapStateToProps, {fetchCurrentOrder, fillOrder, fetchInventories, deleteOrder})(OrderDetailsView)

