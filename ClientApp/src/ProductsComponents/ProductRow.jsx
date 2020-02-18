import React from 'react';
import Button from 'react-bootstrap/Button'

const ProductRow = ({product, handleSelect}) => {
    return(
        <>
            <tr onDoubleClick={() => handleSelect(product.productID)}>
                <td>{product.sku}</td>
                <td>{product.productDescription}</td>
                <td>{product.totalInventory}</td>
                <td style={{    width:'1%', whiteSpace:'nowrap'}}>
                    <Button variant="outline-info" onClick={() => handleSelect(product.productID)}>View/Edit</Button>
                </td>
            </tr>
        </>
    )
}

export default ProductRow