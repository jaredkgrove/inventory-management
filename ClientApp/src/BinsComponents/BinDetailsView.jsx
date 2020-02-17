import {fetchCurrentBin} from '../actions/BinActions/fetchCurrentBin'
import {updateBin} from '../actions/BinActions/updateBin'
import {deleteBin} from '../actions/BinActions/deleteBin'
import {createOrUpdateInventory} from '../actions/InventoryActions/createOrUpdateInventory'
import React, {useEffect, useState} from 'react';
import MoveInventoryForm from './MoveInventoryForm'
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


function BinDetailsView({bin, match, fetchCurrentBin, updateBin, deleteBin, createOrUpdateInventory, history, products, bins}){
    const [isEditing, setIsEditing] = useState(false)
    const [newBinName, setNewBinName] = useState('')
    const [newInventoryProductID, setNewInventoryProductID] = useState('')
    const [newInventoryQTY, setNewInventoryQTY] = useState(null)

    useEffect(() => {
        if(bin.binID !== match.params.binID){
            fetchCurrentBin(match.params.binID)
        }
    },[])

    useEffect(() => {
        if(products.length && !newInventoryProductID){
            setNewInventoryProductID(products[0].productID)
        }
    },[products])

    const handleSubmit = (e) => {
        e.preventDefault()
        updateBin(bin.binID, {...bin, ...{binName: newBinName}})
        setIsEditing(false)
    }

    const handleAddInventory = (e) => {
        e.preventDefault()
        createOrUpdateInventory({binID: bin.binID, productID: parseInt(newInventoryProductID), qty: parseInt(newInventoryQTY)})
        setIsEditing(false)
        setNewInventoryQTY(0)
    }

    const renderBinProducts = () =>  bin.inventories.map(i => {
        return (
            <tr>
                <td>{i.productDescription}</td>
                <td>{i.productSKU}</td>
                <td>{i.qty}</td>
                <td style={{width:'1%', whiteSpace:'nowrap'}}><MoveInventoryForm key={i.inventoryID} inventory={i} bins={bins} /></td>
            </tr>
        )
    })

    const renderBinInfo = () => {
        if(isEditing){
            return(
                <form onSubmit={handleSubmit}>
                    <br/>
                    <Form.Control type="text" size="lg" name="binName" value={newBinName} onChange={(e) => setNewBinName(e.target.value)}/>
                    <Button type="submit">Update Bin</Button>
                </form>
            )
        }else{
            return <h1>{bin.binName}</h1>
        }
    }
    
    const renderProductOptions = () => products.map(p => <option key={p.productID} value={p.productID}>{p.productDescription}</option>)

    return (
        <>
        <Button onClick={() => {setIsEditing(true); setNewBinName(bin.binName);}}>Edit</Button>
        <Button variant="danger" onClick={() => {deleteBin(bin.binID); history.push("/Bins");}}>Delete</Button>
        {renderBinInfo()}
        <h3>Products</h3>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Inventory</th>
                </tr>
            </thead>
            <tbody>
                {renderBinProducts()}
            </tbody>
        </Table>
        <form onSubmit={handleAddInventory}>
            <Form.Control as="select" onChange={(e) => setNewInventoryProductID(e.target.value)} value={newInventoryProductID}>
                {renderProductOptions()}
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
        bin: state.currentBin
    }
  }

export default connect(mapStateToProps, {fetchCurrentBin, updateBin, deleteBin, createOrUpdateInventory})(BinDetailsView)

