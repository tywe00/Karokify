import HomeView from '../views/homeView.js';
import { connect } from "react-redux";

function mapStateToProps(state) {
  return{
    userPlayList : state.userSpotifyPlayList,
    tokenInfo : state.tokenInfo,
    currentPlaying : state.currentPlaying,
  };
}

const HomePresenter = connect(mapStateToProps)(HomeView);

export default HomePresenter;