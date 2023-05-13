import { deleteSearchResults, doSearch, setSearchTerm } from '../slices/searchResultSlice.js';
import HomeView from '../views/homeView.js';
import { connect } from "react-redux";

function mapStateToProps(state) {
  return{
    userPlayList : state.userSpotifyPlayList,
    tokenInfo : state.tokenInfo,
    searchResults : state.searchResults.searchResults,
    searchTerm : state.searchResults.searchTerm,
    currentPlaying : state.currentPlaying,
  };
}

function mapDispatchToProps(dispatch) {
  return{
    search: ({accessToken, searchTerm}) => dispatch(doSearch({accessToken, searchTerm})),
    deleteSearchResults : () => dispatch(deleteSearchResults()),
    setSearchTerm : (searchTerm) => dispatch(setSearchTerm(searchTerm)), 
  };
}

const HomePresenter = connect(mapStateToProps, mapDispatchToProps)(HomeView);

export default HomePresenter;