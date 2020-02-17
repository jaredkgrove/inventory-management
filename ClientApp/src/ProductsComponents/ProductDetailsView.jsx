import {fetchCurrentProduct} from '../actions/ProductActions/fetchCurrentProduct'
import {updateProduct} from '../actions/ProductActions/updateProduct'
import {deleteProduct} from '../actions/ProductActions/deleteProduct'
import {createOrUpdateInventory} from '../actions/InventoryActions/createOrUpdateInventory'

import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';


function ProductDetailsView({product, match, fetchCurrentProduct, updateProduct, deleteProduct, createOrUpdateInventory, history, bins, products}){
    const [isEditing, setIsEditing] = useState(false)
    const [newProductDescription, setNewProductDescription] = useState('')
    const [newSku, setNewSku] = useState('')
    const [newInventoryBinID, setNewInventoryBinID] = useState('')
    const [newInventoryQTY, setNewInventoryQTY] = useState(null)

    useEffect(() => {
        if(product.productID !== match.params.productID){
            fetchCurrentProduct(match.params.productID)
        }
    },[])

    useEffect(() => {
        if(bins.length && !newInventoryBinID){
            setNewInventoryBinID(bins[0].binID)    
        }
    },[bins])

    const handleSubmit = (e) => {
        e.preventDefault()
        updateProduct(product.productID, {...product, ...{productDescription: newProductDescription, sku:newSku}})
        setIsEditing(false)
    }

    const handleAddInventory = (e) => {
        e.preventDefault()
        createOrUpdateInventory({productID: product.productID, binID: parseInt(newInventoryBinID), qty: parseInt(newInventoryQTY)})
        setIsEditing(false)
        setNewInventoryQTY(0)

    }

    const renderProductBins = () =>  product.inventories.map(i => <tr key={i.binID}><td>{i.binName}</td><td>{i.qty}</td></tr>)

    const renderProductInfo = () => {
        if(isEditing){
            return(
                <form onSubmit={handleSubmit}>
                    <Form.Control type="text" name="productDescription" value={newProductDescription} onChange={(e) => setNewProductDescription(e.target.value)}/><br/>
                    <Form.Control type="text" name="sku" value={newSku} onChange={(e) => setNewSku(e.target.value)}/><br/>
                    <Button type="submit">Update Product</Button>
                </form>
            )
        }else{
            return (
                <>
                    <h1>{product.productDescription}</h1>
                    <p>SKU: {product.sku}</p>
                </>
            )
        }
    }

    const renderBinOptions= () => bins.map(b => <option key={b.binID} value={b.binID}>{b.binName}</option>)

    return (
        <>
        <Button onClick={() => {setIsEditing(true); setNewProductDescription(product.productDescription); setNewSku(product.sku);}}>Edit</Button>
        <Button variant="danger" onClick={() => {deleteProduct(product.productID); history.push("/Products");}}>Delete</Button>
        {renderProductInfo()}
        <p>Total Inventory: {product.totalInventory}</p>
        <h3>Bins</h3>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Bin</th>
                    <th>Inventory</th>
                </tr>
            </thead>
            <tbody>
                {renderProductBins()}
            </tbody>
        </Table>
        <form onSubmit={handleAddInventory}>
            <Form.Control as="select" onChange={(e) => setNewInventoryBinID(e.target.value)} value={newInventoryBinID} >
                {renderBinOptions()}
            </Form.Control>
            <Form.Control type="number" min="0" onChange={(e) => setNewInventoryQTY(e.target.value)} placeholder="QTY to Add" value={newInventoryQTY}/>
            <Button type="submit">Add Inventory</Button>
        </form>
        {/* {Table for open orders} */}
</>
    );
}

const mapStateToProps = state => {
    return {
        products: state.products,
        bins: state.bins,
        product: state.currentProduct
    }
  }

export default connect(mapStateToProps, {fetchCurrentProduct, updateProduct, deleteProduct, createOrUpdateInventory})(ProductDetailsView)