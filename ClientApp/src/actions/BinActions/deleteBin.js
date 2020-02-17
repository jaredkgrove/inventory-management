
export const deleteBin = (id) => {

    return (dispatch) => {
        fetch(`/api/Bins/${id}`,{
            method: 'DELETE',
        })
        .then((resp) => {
            if(!resp.ok){throw Error(resp.statusText);}
            return resp.json()
        })
        .then((bin) => { 
            dispatch(
            {
                type: 'DELETE_BIN', 
                payload: bin
            })
        })
        .catch(error => console.log(error))
    
    }
}

