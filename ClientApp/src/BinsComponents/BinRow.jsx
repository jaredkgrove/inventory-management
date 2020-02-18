import React from 'react';
import Button from 'react-bootstrap/Button'

const BinRow = ({bin, handleSelect}) => {
    return(
        <>
            <tr onDoubleClick={() => handleSelect(bin.binID)}>
                <td>{bin.binName}</td>
                <td style={{width:'1%', whiteSpace:'nowrap'}}>
                    <Button variant="outline-info" onClick={() => handleSelect(bin.binID)}>View/Edit</Button>
                </td>
            </tr>
        </>
    )
}

export default BinRow