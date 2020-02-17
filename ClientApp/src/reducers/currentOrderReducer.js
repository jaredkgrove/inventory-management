const currentOrderReducer = (state = {orderID:'', orderNumber:'', customerName:'', customerAddress:'', orderLines:[]}, action) => {
  switch(action.type) {
    case 'FETCH_CURRENT_ORDER':
      return action.payload
    case 'FILL_ORDER':
      return action.payload
    case 'DELETE_ORDER':
      return {orderID:'', orderNumber:'', customerName:'', customerAddress:'', orderLines:[]}
    default:
      return state;
  }
}
   
export default currentOrderReducer;