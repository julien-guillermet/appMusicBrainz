const initialState = {
  searchedArtist: ''
  };

  function SearchedArtist(state = initialState, action) {
    let nextState;
  switch (action.type) {
    case 'UPDATE_SEARCHED_ARTIST':
      nextState = {
        searchedArtist: action.myString,
      };
      return nextState;
    default:
      return state;
  }
  }

  export default SearchedArtist