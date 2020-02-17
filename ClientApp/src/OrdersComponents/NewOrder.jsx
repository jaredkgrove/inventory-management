import {createOrder} from '../actions/OrderActions/createOrder'
import React, {useState} from 'react';
import { connect } from 'react-redux';
import OrderLineInputs from './OrderLineInputs'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';


function NewOrder(props){
    // const [orderNumber, setOrderNumber] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    // const [orderLinesCount, setOrderLinesCount] = useState(1);
    const [orderLines, setOrderLines] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(orderLines.length){
            // orderNumber: orderNumber,
            props.createOrder({ customerName: customerName, customerAddress: customerAddress, orderLines: orderLines})
            e.target.reset()
            // setOrderNumber('')
            setCustomerName('')
            setCustomerAddress('')
            setOrderLines([])
        }else{
            alert('Please add products to Order')
        }

        // props.createOrder({orderNumber: orderNumber})
    }

    const addOrderLine = (newOrderLine) => {
        let index = orderLines.findIndex(ol => ol.productID === newOrderLine.productID)
        if(index >= 0){
            let updatedOrderLine = orderLines.slice(index, index + 1)[0]
            updatedOrderLine.qty += newOrderLine.qty
            setOrderLines([...orderLines.slice(0, index), updatedOrderLine, ...orderLines.slice(index+1)])
        }else{
            setOrderLines([...orderLines, newOrderLine])
        }
    }

    const renderOrderLinesInputs = () => {
        return <OrderLineInputs products={props.products} addToOrder={addOrderLine} />
    }

    const renderOrderLines = () => {
        return orderLines.map(ol => <tr key={ol.productID}><td>{ol.productDescription}</td><td>{ol.qty}</td></tr>)
    }
    

    return(
        <form onSubmit={handleSubmit}>
            {/* <input type="text" name="orderNumber" value={orderNumber} onChange={(e) => setOrderNumber( e.target.value)} placeholder="Order Number"/> */}
            <Form.Control type="text" name="customerName" value={customerName} onChange={(e) => setCustomerName( e.target.value)} placeholder="Customer Name"/>
            <Form.Control type="text" name="customerAddress" value={customerAddress} onChange={(e) => setCustomerAddress( e.target.value)} placeholder="Customer Address"/>
            <Button type="submit">Create Order</Button>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>productDescription</th>
                        <th>QTY</th>
                    </tr>
                </thead>
                <tbody>
                    {renderOrderLines()}
                </tbody>
            </Table>
            {renderOrderLinesInputs()}
   
        </form> 
    ) 
}

const mapStateToProps = state => {
    return {
        orders: state.orders,
        products: state.products
    }
  }

export default connect(mapStateToProps, {createOrder})(NewOrder)