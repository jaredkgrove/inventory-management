export function fetchOrders(){
    return (dispatch) => {
        fetch(`/api/Orders`)
        .then((resp) => {
            if(!resp.ok){throw Error(resp.statusText);}
            return resp.json()
        })
        .then((orders) => {
            dispatch({type: 'FETCH_ORDERS', 
            payload: orders
        })})
        .catch(error => console.log(error))
    }
}

