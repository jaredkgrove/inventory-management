
export const deleteOrder = (id) => {

    return (dispatch) => {
        fetch(`/api/Orders/${id}`,{
            method: 'DELETE',
        })
        .then((resp) => {
            if(!resp.ok){throw Error(resp.statusText);}
            return resp.json()
        })
        .then((order) => { 
            dispatch(
            {
                type: 'DELETE_ORDER', 
                payload: order
            })
        })
        .catch(error => console.log(error))
    
    }
}

