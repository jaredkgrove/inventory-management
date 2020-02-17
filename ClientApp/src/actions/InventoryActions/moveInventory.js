export const moveInventory = (data) => {
    return (dispatch) => {
        fetch(`/api/Inventories/MoveInventory/${data.sourceInventoryID}`,{
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'PUT',
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
        })
        .catch(error => console.log(error))
    }
}

