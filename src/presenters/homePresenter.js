import { setCurrentPlaying } from '../slices/currentPlayingSlice.js';
import { addTrack } from '../slices/recentTracksSlice.js';
import { deleteSearchResults, doSearch, setSearchTerm } from '../slices/searchResultSlice.js';
import HomeView from '../views/homeView.js';
import { connect } from "react-redux";

function mapStateToProps(state) {
  return{
    userPlayList : state.userSpotifyPlayList,
    tokenInfo : state.tokenInfo,
    searchResults : state.searchResults.searchResults,
    searchTerm : state.searchResults.searchTerm,
    currentTrack : state.currentTrack.track,
    recentTracks : state.playedHistory.recentTracksList,
    userInfo : state.userInfo,
    persistedData : state.persistedData,
  };
}

function mapDispatchToProps(dispatch) {
  return{
    search: ({accessToken, searchTerm}) => dispatch(doSearch({accessToken, searchTerm})),
    deleteSearchResults : () => dispatch(deleteSearchResults()),
    setSearchTerm : (searchTerm) => dispatch(setSearchTerm(searchTerm)), 
    setCurrentTrack : (track) => dispatch(setCurrentPlaying(track)),
    addToRecent : (trackID) => dispatch(addTrack(trackID)),
  };
}

const HomePresenter = connect(mapStateToProps, mapDispatchToProps)(HomeView);

export default HomePresenter;