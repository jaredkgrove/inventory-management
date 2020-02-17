import React, {useState} from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import ProductRow from './ProductRow'

function ProductsTable({products, history}){
    const renderProducts = () => products.map((p) => <ProductRow key={p.sku} product={p}  handleSelect={(id) => history.push(`/products/${id}`)}/>)


    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Product Description</th>
                    <th>Total Inventory</th>
                </tr>
            </thead>
            <tbody>
                {renderProducts()}
            </tbody>
        </Table>
    );
}


export default connect(null, {})(ProductsTable)