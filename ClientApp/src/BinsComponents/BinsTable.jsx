import React, {useState} from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import BinRow from './BinRow'

function BinsTable({bins, history}){
    const renderBins = () => bins.map((b) => <BinRow key={b.binID} bin={b}  handleSelect={(id) => history.push(`/bins/${id}`)}/>)


    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Bin Name</th>
                    {/* <th>Product Description</th> */}
                    {/* <th>Total Inventory</th> */}
                </tr>
            </thead>
            <tbody>
                {renderBins()}
            </tbody>
        </Table>
    );
}


export default connect(null, {})(BinsTable)