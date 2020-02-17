import React, {useState, useEffect} from 'react';
import {moveInventory} from '../actions/InventoryActions/moveInventory'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';


const MoveInventory = ({inventory, moveInventory, bins}) => {
    const [destinationBinID, setDestinationBinID] = useState(null)
    const [moveQty, setMoveQty] = useState(null)

    useEffect(() => {
        if(bins.length && !destinationBinID){
            if(bins[0].binID !== inventory.binID){
                setDestinationBinID(bins[0].binID)
            }else if(bins.length > 1){
                setDestinationBinID(bins[1].binID)
            }
        }
    },[bins])

    const renderBinOptions = () => bins.map(b => {if(b.binID !== inventory.binID){return <option key={b.binId} value={b.binID}>{b.binName}</option>}})

    const handleSubmit = (e) => {
        e.preventDefault()
        moveInventory({sourceInventoryID: inventory.inventoryID, destinationBinID: parseInt(destinationBinID), productID: inventory.productID, qty: parseInt(moveQty)})
        setMoveQty(0)
    }

    return(
        <>
            <Form inline onSubmit={handleSubmit}>
                <Form.Control  as="select" onChange={(e) => setDestinationBinID(e.target.value)} value={destinationBinID}>
                    {renderBinOptions()}
                </Form.Control>
                <Form.Control  type="number" onChange={(e) => setMoveQty(e.target.value)} placeholder="QTY to Move" value={moveQty}/>
                <Button  type="submit">Move Inventory</Button>
            </Form>
        </>
    )
}

export default connect(null, { moveInventory })(MoveInventory)
