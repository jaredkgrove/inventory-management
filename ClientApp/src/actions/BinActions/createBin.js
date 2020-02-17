export const createBin = (data) => {

    return (dispatch) => {
        fetch(`/api/Bins`,{
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
        .then((bin) => { 
            dispatch(
            {
                type: 'CREATE_BIN', 
                payload: bin
            })
        })
        .catch(error => console.log(error))
    
    }
}

