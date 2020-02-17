export const createOrUpdateInventory = (data) => {

    return (dispatch) => {
        fetch(`/api/Inventories`,{
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then((resp) => {
            if(!resp.ok){throw Error(resp.statusText);}
            return resp.json()
        })
        .then((inventory) => {
            dispatch(
            {
                type: 'CREATE_INVENTORY', 
                payload: inventory
            })
            dispatch(
            {
                type: 'ADJUST_TOTAL_INVENTORY', 
                payload: {productID: data.productID, qty: data.qty}
            })
        })
        .catch(error => console.log(error))
    }
}

