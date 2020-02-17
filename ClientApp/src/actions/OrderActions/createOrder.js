export const createOrder = (data) => {
    console.log(data)
    return (dispatch) => {
        fetch(`/api/Orders`,{
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
        .then((order) => { 
            dispatch(
            {
                type: 'CREATE_ORDER', 
                payload: order
            })
        })
        .catch(error => console.log(error))
    
    }
}

