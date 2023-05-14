import React, { useState, useEffect } from "react";
import TrackRow from "../components/trackRow.js";
import Sidebar from "../components/sidebar.js";
import Karaoke from "./karaokeView.js";
import "../styles/homeView.css";
import "../styles/nav.css";
import Player from "../components/player";
import Navbar from "../components/navbar.js";
import { BsChatSquareQuote, BsChatSquareQuoteFill } from "react-icons/bs";
import { getAlbum, getPlaylists, getSearchResults } from "../utils/api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doSearch } from "../slices/searchResultSlice.js";

//TODO: Add description of what a user can expect of karokify
//TODO: Add a header on top of sidebar to describe purpose
//TODO: Indicate the function of lyrics button
function HomeView(props) {
  const [useKaraoke, setUseKaraoke] = useState(false); //state to hold a conditional value to render karokie view
  const [isPlaying, setIsPlaying] = useState(false); // variable to keep track of playing state throughout the app
  const [currentTime, setCurrentTime] = useState(0);
  const [playstate, setPlaystate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("homeview is mounted");
  }, []);

  let content = null;

  if (useKaraoke) {
    content = (
      <Karaoke
        currentTime={currentTime}
        isPlaying={isPlaying}
        props={props.currentTrack.id}
      />
    );
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
        <div className="sidebar">
          <Sidebar playlists={props.userPlayList.playlists} />
        </div>
        <div className="mainContent">
          <div className="navbar">
            <div className="searchBar">
              <input
                id="searchInput"
                className="form-control"
                onChange={handleSearch}
                type="text"
                placeholder="Search"
              />
              <button onClick={clearSearchInput}>Clear</button>
            </div>
            <div className="menu">
              <nav>
                <ul>
                  <li>
                    <a href="#" onClick={logOutUser}>
                      Log Out
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <button
            className="lyricsToggle"
            onClick={() => setUseKaraoke(!useKaraoke)}
          >
            {useKaraoke ? <BsChatSquareQuoteFill /> : <BsChatSquareQuote />}
          </button>
          {content}
        </div>
      </div>
      {props.currentTrack ? (
        <Player
          setIsPlaying={setIsPlaying}
          setCurrentTime={setCurrentTime}
          trackURI={"spotify:track:" + props.currentTrack.id}
          play={playstate}
        />
      ) : (
        <Player />
      )}
    </div>
  );

  function searchResultsRenderCB(track) {
    return (
      <tr
        key={track.id}
        onClick={() => {
          setCurrentTrack(track);
        }}
      >
        <TrackRow data={{ track }} />
      </tr>
    );
  }

  function logOutUser() {
    localStorage.clear();
    navigate("/");
  }

  function handleSearch(e) {
    if (e.target.value.length > 2) {
      e.preventDefault();
      const accessToken = localStorage.getItem("access_token");
      props.setSearchTerm(e.target.value);
      const searchTerm = props.searchTerm;
      props.search({ accessToken, searchTerm });
    }
  }

  function clearSearchInput() {
    document.getElementById("searchInput").value = "";
    props.deleteSearchResults();
  }

  function setCurrentTrack(track) {
    setUseKaraoke(true);
    setPlaystate(true);
    props.setCurrentTrack(track);
    props.addToRecent(track.id);
  }
}

export default HomeView;
