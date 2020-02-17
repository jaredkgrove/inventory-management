const currentProductReducer = (state = {productID:'', sku:'', productDescription:'', inventories:[] }, action) => {
    switch(action.type) {
      case 'FETCH_CURRENT_PRODUCT':
        return action.payload
      case 'UPDATE_CURRENT_PRODUCT':
        return {...state, productDescription: action.payload.productDescription, sku: action.payload.sku}
      case 'CREATE_INVENTORY':
        const existingIndex = state.inventories.findIndex(i => i.inventoryID === action.payload.inventoryID)
        if(existingIndex >= 0){
          return {...state, inventories: [...state.inventories.slice(0, existingIndex), action.payload, ...state.inventories.slice(existingIndex + 1)]}
        }else{
          return {...state, inventories: [...state.inventories, action.payload]}
        }
      case 'DELETE_PRODUCT':
        return {productID:'', sku:'', productDescription:'', inventories:[] }
      default:
        return state;
    }
  }
   
  export default currentProductReducer;