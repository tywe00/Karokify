import React, { useState, useEffect } from "react";
import TrackRow from "../components/trackRow.js";
import Sidebar from "../components/sidebar.js";
import Karaoke from "./karaokeView.js";
import "../styles/homeView.css";
import "../styles/nav.css";
import Player from "../components/player";
import Navbar from "../components/navbar.js";
import { BsChatSquareQuote, BsChatSquareQuoteFill } from "react-icons/bs";
import { getAlbum, getPlaylists,getSearchResults,getUserInfo } from "../utils/api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doSearch } from "../slices/searchResultSlice.js";
import TrackHistory from "../components/trackHistory.js";
import { playHistory } from "../data/historyData.js";


//TODO: Add description of what a user can expect of karokify
//TODO: Add a header on top of sidebar to describe purpose
//TODO: Indicate the function of lyrics button
function HomeView(props) {
 
  const [useKaraoke, setUseKaraoke] = useState(false); //state to hold a conditional value to render karokie view
  const navigate = useNavigate();
  let user_ID = getUserInfo(localStorage.getItem("access_token")).then((data) => { user_ID = data.id; console.log(user_ID);});
  
  useEffect(() => {
    console.log("homeview is mounted")
  }, []);

  let content = null;

  if (useKaraoke) {
    content = <Karaoke props={props.currentTrack.id} />;
  } else if (props.searchResults) {
    content = (
      <div className="searchResults">
        <tbody>
          <tr>{props.searchResults.map(searchResultsRenderCB)}</tr>
        </tbody>
      </div>
    );
  } else {
    content = <p>Loading...</p>;
  }


  return (
    <div className="homeView">
      <div className="wrapper">
    <div><TrackHistory data = {playHistory} setCurrentTrack = {setCurrentTrack}/></div>
        <div className="sidebar">
          <Sidebar playlists={props.userPlayList.playlists} />
        </div>
        <div className="mainContent">
          
          <div className="navbar">
            <div className="searchBar">
              <input id="searchInput" className="form-control" onChange={handleSearch} type="text" placeholder="Search" />
              <button onClick={clearSearchInput}>Clear</button>
            </div>
            <div className="menu">
              <nav>
                <ul>
                  <li>
                    <a href="#" onClick={logOutUser}>Log Out</a>
                  </li>
                </ul>
              </nav>
              
            </div>

          </div>
          
          <button className="lyricsToggle" onClick={() => setUseKaraoke(!useKaraoke)}>
            {useKaraoke ? <BsChatSquareQuoteFill /> : <BsChatSquareQuote />}
          </button>
          {content}
        </div>
      </div>
      {props.currentTrack ? <Player trackURI={"spotify:track:" + props.currentTrack.id} /> : <Player />}
    </div>
  );

  function searchResultsRenderCB(track) {
    return (
      <tr key={track.id} onClick={() => {
        setCurrentTrack(track);
        }}>
        <TrackRow data={{ track }} />
      </tr>
    );
  }

  function logOutUser() {
    localStorage.clear();
    navigate('/');
    
  }

  function handleSearch(e) {
    if (e.target.value.length > 2) {
      e.preventDefault();
      const accessToken = localStorage.getItem('access_token');
      props.setSearchTerm(e.target.value)
      const searchTerm = props.searchTerm
      props.search({accessToken, searchTerm});
   
    }
  }

  function clearSearchInput() {
    document.getElementById('searchInput').value = '';
    props.deleteSearchResults();
  }

  function setCurrentTrack(track) {
    setUseKaraoke(true);
    props.setCurrentTrack(track);
    props.addToRecent(track.id);
    playHistory.playHistoryList.unshift(track);
    
  }
}

export default HomeView;
