export function fetchProducts(){
    return (dispatch) => {
        fetch(`/api/Products`)
        .then((resp) => {
            if(!resp.ok){throw Error(resp.statusText);}
            return resp.json()
        })
        .then((products) => {
            dispatch({type: 'FETCH_PRODUCTS', 
            payload: products
        })})
        .catch(error => console.log(error))
    }
}

