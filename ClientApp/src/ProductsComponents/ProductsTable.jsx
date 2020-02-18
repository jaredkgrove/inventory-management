import React, {useState} from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import ProductRow from './ProductRow'

function ProductsTable({products, history}){
    const [searchValue, setSearchValue] = useState('')

    const renderProducts = () => products.map((p) => {
        if(p.productDescription.toLowerCase().includes(searchValue.toLowerCase()) || p.sku.toLowerCase().includes(searchValue.toLowerCase()) || searchValue === '')
        {
            return <ProductRow key={p.sku} product={p}  handleSelect={(id) => history.push(`/products/${id}`)}/>
        }
    })

    return (
        <>
        <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Search...'></input>
        <Table striped bordered hover size="sm">
            <thead onClick={(e) => console.log(e.target.innerText)}>
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
        </>
    );
}


export default connect(null, {})(ProductsTable)