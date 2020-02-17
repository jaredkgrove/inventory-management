export function fetchBins(){
    return (dispatch) => {
        fetch(`/api/Bins`)
        .then((resp) => {
            if(!resp.ok){throw Error(resp.statusText);}
            return resp.json()
        })
        .then((bins) => {
            dispatch({type: 'FETCH_BINS', 
            payload: bins
        })})
        .catch(error => console.log(error))
    }
}

