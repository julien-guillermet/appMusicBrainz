const initialState = {
    favorites: []
  };

  function ArtistsFav(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'ADD_ON_FAV':
            nextState = {
                favorites: [...state.favorites, action.artistInfos]
            };
          return nextState;
        case 'REMOVE_FROM_FAV':
        state.favorites.splice(action.artistPosition, 1)
            nextState = {
                favorites: [ ...state.favorites]
            };
          return nextState;
        default:
          return state;
      }
  }

  export default ArtistsFav