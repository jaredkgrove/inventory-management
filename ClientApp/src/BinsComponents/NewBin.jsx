import {createBin} from '../actions/BinActions/createBin'
import React, {useState} from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';


function NewBin(props){
    const [binName, setBinName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()
        if(binName){
            props.createBin({binName: binName})
            setBinName('')
        }else{
            alert('Please enter bin name')
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <Form.Control type="text" name="binName" value={binName} onChange={(e) => setBinName( e.target.value)} placeholder="Bin Name"/>
            <Button type="submit">Create Bin</Button>
        </form> 
    ) 
}


export default connect(null, {createBin})(NewBin)