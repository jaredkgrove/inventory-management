export const createProduct = (data) => {

    return (dispatch) => {
        fetch(`/api/Products`,{
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
        .then((product) => { 
            dispatch(
            {
                type: 'CREATE_PRODUCT', 
                payload: product
            })
        })
        .catch(error => console.log(error))
    
    }
}

