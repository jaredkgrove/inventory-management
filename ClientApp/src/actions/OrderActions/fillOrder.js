export const fillOrder = (id, data) => {
   
    return (dispatch) => {
        fetch(`/api/Orders/${id}/FillOrder`,{
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
        .then((order) => { 
            dispatch(
            {
                type: 'FILL_ORDER', 
                payload: order
            })
            order.orderLines.forEach(ol =>{
                dispatch(
                    {
                        type: 'ADJUST_TOTAL_INVENTORY', 
                        payload: {productID: ol.productID, qty: -ol.qty}
                    })
                }
            )
        })
        .catch(error => console.log(error))
    }
}

