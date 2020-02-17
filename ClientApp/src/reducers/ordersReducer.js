const ordersReducer = (state = [], action) => {
    let index = -1
    switch(action.type) {
      case 'FETCH_ORDERS':
        return action.payload
      case 'CREATE_ORDER':
        return [...state, action.payload]
      case 'FILL_ORDER':
        index = state.findIndex(o => o.orderID === action.payload.orderID)
        return [...state.slice(0, index), action.payload ,...state.slice(index + 1)]
      case 'DELETE_ORDER':
        index = state.findIndex(o => o.orderID === action.payload.orderID)
        return [...state.slice(0, index), ...state.slice(index + 1)]
      default:
        return state;
    }
  }
   
  export default ordersReducer;