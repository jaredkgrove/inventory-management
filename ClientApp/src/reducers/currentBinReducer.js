const currentBinReducer = (state = {binID:'', binName:'', inventories:[] }, action) => {
    switch(action.type) {
      case 'FETCH_CURRENT_BIN':
        return action.payload
      case 'UPDATE_CURRENT_BIN':
        return {...state, ...{binName: action.payload.binName}}
      case 'CREATE_INVENTORY':
        const existingIndex = state.inventories.findIndex(i => i.inventoryID === action.payload.inventoryID)
        if(existingIndex >= 0){
          if(action.payload.qty === 0){ return {...state, inventories: [...state.inventories.slice(0, existingIndex), ...state.inventories.slice(existingIndex + 1)]}}
          return {...state, inventories: [...state.inventories.slice(0, existingIndex), action.payload, ...state.inventories.slice(existingIndex + 1)]}
        }else{
          return {...state, inventories: [...state.inventories, action.payload]}
        }
      case 'DELETE_BIN':
        return {binID:'', binName:'', inventories:[] }
      default:
        return state;
    }
  }
   
  export default currentBinReducer;