
import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';


function FillOrderInput(props){
    const [inventoryID, setInventoryID] = useState(null)

    const renderBinOptions = () => props.inventories.map(i => <option key={i.inventoryID} value={i.inventoryID}>{i.binName}</option>)
    const handleChange = (e) => {
        props.updateFillData(props.orderLineID, parseInt(e.target.value))
        setInventoryID(e.target.value)
    }
    return(
        <>
            <Form.Control as="select" onChange={handleChange} value={inventoryID}>
                <option disabled selected value>-- choose bin --</option>
                {renderBinOptions()}
            </Form.Control>
        </>
    ) 
}


export default connect(null, {})(FillOrderInput)