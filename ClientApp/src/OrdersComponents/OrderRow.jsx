import React from 'react';
import Button from 'react-bootstrap/Button'

const OrderRow = ({order, handleSelect}) => {
    return(
        <>
            <tr onDoubleClick={() => handleSelect(order.orderID)}>
                <td>{order.orderFilled ? "FILLED":"OPEN"}</td>
                <td>{order.orderNumber}</td>
                <td>{order.dateOrdered}</td>
                <td>{order.customerName}</td>
                <td>{order.customerAddress}</td>
                <td>
                    <Button onClick={() => handleSelect(order.orderID)}>View/Edit</Button>
                </td>
            </tr>
        </>
    )
}

export default OrderRow