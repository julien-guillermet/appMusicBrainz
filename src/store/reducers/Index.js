import { combineReducers } from 'redux';
import ArtistsFav from './ArtistsFavReducer';
import SearchedArtist from './SearchedArtistReducer'
import ItemsList from './ItemsListReducer'

export default combineReducers({
    ArtistsFav,
    SearchedArtist,
    ItemsList,
});