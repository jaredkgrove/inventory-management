export function fetchCurrentBin(id){
    return (dispatch) => {
        fetch(`/api/Bins/${id}`)
        .then((resp) => {
            if(!resp.ok){throw Error(resp.statusText);}
            return resp.json()
        })
        .then((bin) => {
            dispatch({type: 'FETCH_CURRENT_BIN', 
            payload: bin
        })})
        .catch(error => console.log(error))
    }
}

