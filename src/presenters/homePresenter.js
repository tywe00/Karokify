import HomeView from '../views/homeView.js';
import { connect } from "react-redux";

function mapStateToProps(state) {
  return{
    userPlayList : state.userSpotifyPlayList,
    accessToken : state.tokenInfo
  };
}

const HomePresenter = connect(mapStateToProps)(HomeView);

export default HomePresenter;