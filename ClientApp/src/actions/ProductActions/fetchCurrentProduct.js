export function fetchCurrentProduct(id){
    return (dispatch) => {
        fetch(`/api/Products/${id}`)
        .then((resp) => {
            if(!resp.ok){throw Error(resp.statusText);}
            return resp.json()
        })
        .then((product) => {
            dispatch({type: 'FETCH_CURRENT_PRODUCT', 
            payload: product
        })})
        .catch(error => console.log(error))
    }
}

