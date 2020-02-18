import {createProduct} from '../actions/ProductActions/createProduct'
import React, {useState} from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';


function NewProduct(props){
    const [sku, setSku] = useState('');
    const [productDescription, setProductDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()
        if(sku && productDescription){
            props.createProduct({sku: sku, productDescription: productDescription})
            setSku('')
            setProductDescription('')
        }else{
            alert('Please enter SKU and Product Description')
        }

    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Control type="text" name="sku" value={sku} onChange={(e) => setSku( e.target.value)} placeholder="SKU"/>
            <Form.Control type="text" name="productDescription" value={productDescription} onChange={(e) => setProductDescription( e.target.value)} placeholder="Product Description"/>
            <Button type="submit">Create Product</Button>
        </Form> 
    ) 
}


export default connect(null, {createProduct})(NewProduct)