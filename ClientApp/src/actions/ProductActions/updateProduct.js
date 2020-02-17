
export function updateProduct(id, data){
    return (dispatch) => {
        fetch(`/api/Products/${id}`,{
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
        .then(product => {
            dispatch(
            {
                type: 'UPDATE_CURRENT_PRODUCT', 
                payload: product
            })
        }
        )
        .catch(error => console.log(error))
    
    }
}

