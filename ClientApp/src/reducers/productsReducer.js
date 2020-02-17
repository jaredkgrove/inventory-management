const productsReducer = (state = [], action) => {
    let index = -1
    switch(action.type) {
      case 'FETCH_PRODUCTS':
        return action.payload
      case 'CREATE_PRODUCT':
        return [...state, action.payload]
      case 'UPDATE_CURRENT_PRODUCT':
        index = state.findIndex(p => p.productID === action.payload.productID)
        return [...state.slice(0, index), action.payload, ...state.slice(index + 1)]
      case 'ADJUST_TOTAL_INVENTORY':
        index = state.findIndex(p => p.productID === action.payload.productID)
        const updatedTotalInventory = state.slice(index, index+1)[0].totalInventory + action.payload.qty//updatedInventories.reduce((a, b) => a + b.qty, 0)
        const updatedProduct = {...state.slice(index, index + 1)[0], totalInventory: updatedTotalInventory}

        return [...state.slice(0, index), updatedProduct, ...state.slice(index + 1)]
      case 'DELETE_PRODUCT':
        index = state.findIndex(p => p.productID === action.payload.productID)
        return [...state.slice(0, index), ...state.slice(index + 1)]
      default:
        return state;
    }
  }
   
  export default productsReducer;