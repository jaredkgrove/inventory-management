const inventoriesReducer = (state = [], action) => {
    switch(action.type) {
      case 'FETCH_INVENTORIES':
        return action.payload
      default:
        return state;
    }
  }
   
export default inventoriesReducer;