
export function updateBin(id, data){
    
    return (dispatch) => {
        fetch(`/api/Bins/${id}`,{
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
        .then(bin => {
            dispatch(
            {
                type: 'UPDATE_CURRENT_BIN', 
                payload: bin
            })
        }
        )
        .catch(error => console.log(error))
    
    }
}

