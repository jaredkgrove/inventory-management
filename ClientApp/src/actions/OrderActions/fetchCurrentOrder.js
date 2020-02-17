export function fetchCurrentOrder(id){
    return (dispatch) => {
        fetch(`/api/Orders/${id}`)
        .then((resp) => {
            if(!resp.ok){throw Error(resp.statusText);}
            return resp.json()
        })
        .then((order) => {
            dispatch({type: 'FETCH_CURRENT_ORDER', 
            payload: order
        })})
        .catch(error => console.log(error))
    }
}

