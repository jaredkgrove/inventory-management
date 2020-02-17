export function fetchInventories(){
    return (dispatch) => {
        fetch(`/api/Inventories`)
        .then((resp) => {
            if(!resp.ok){throw Error(resp.statusText);}
            return resp.json()
        })
        .then((inventories) => {
            dispatch({type: 'FETCH_INVENTORIES', 
            payload: inventories
        })})
        .catch(error => console.log(error))
    }
}

