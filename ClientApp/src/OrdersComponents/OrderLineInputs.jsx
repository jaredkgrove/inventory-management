
import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';


function OrderLineInputs(props){
    const [productID, setProductID] = useState(null)
    const [productDescription, setProductDescription] = useState('')
    const [qty, setQty] = useState(null)

    useEffect(() => {
        if(props.products.length && !productID){
            setProductID(props.products[0].productID)
            setProductDescription(props.products[0].productDescription)
        }
    },[props.products])

    const handleClick = (e) => {
        e.preventDefault()
        if(productID && qty && qty > 0){
            props.addToOrder({productID: parseInt(productID), fillBinID: 0, productDescription: productDescription, qty: parseInt(qty)})
            setQty(0)
        }else{
            alert("Please select Product and QTY")
        }

    }

    const renderProductOptions = () => props.products.map(p => <option key={p.productID} value={p.productID}>{p.productDescription}</option>)
    const handleChange = (e) => {
       e.preventDefault()
        setQty(e.target.value)
    }
    return(
        <>
            <br/>
            <Form.Control as="select" onChange={(e) => {setProductID(e.target.value); setProductDescription(e.target.options[e.target.selectedIndex].text)}} value={productID}>
                {renderProductOptions()}
            </Form.Control>
            <Form.Control type="number" value={qty} onChange={handleChange} placeholder="QTY to Add"/>
            <Button onClick={handleClick}>Add To Order</Button>
        </>
    ) 
}


export default connect(null, {})(OrderLineInputs)