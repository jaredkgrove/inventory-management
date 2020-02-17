const binsReducer = (state = [], action) => {
    let index = -1
    switch(action.type) {
      case 'FETCH_BINS':
        return action.payload
      case 'CREATE_BIN':
        return [...state, action.payload]
      case 'UPDATE_CURRENT_BIN':
        index = state.findIndex(b => b.binID === action.payload.binID)
        return [...state.slice(0, index), action.payload, ...state.slice(index + 1)]
      case 'DELETE_BIN':
        index = state.findIndex(p => p.binID === action.payload.binID)
        return [...state.slice(0, index), ...state.slice(index + 1)]
      default:
        return state;
    }
  }
   
  export default binsReducer;