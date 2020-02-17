
export const deleteProduct = (id) => {

    return (dispatch) => {
        fetch(`/api/Products/${id}`,{
            method: 'DELETE',
        })
        .then((resp) => {
            if(!resp.ok){throw Error(resp.statusText);}
            return resp.json()
        })
        .then((product) => { 
            dispatch(
            {
                type: 'DELETE_PRODUCT', 
                payload: product
            })
        })
        .catch(error => console.log(error))
    
    }
}

