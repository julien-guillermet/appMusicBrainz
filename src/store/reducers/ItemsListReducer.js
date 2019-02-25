const initialState = {
    itemsList: []
  };

  function ItemsList(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'UPDATE_ITEMS_LIST':
            nextState = {
                itemsList: [...action.new_itemsList]
            };
          return nextState;
        default:
          return state;
      }
  }

  export default ItemsList