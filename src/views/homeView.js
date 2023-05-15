import React, { useState, useEffect } from "react";
import TrackRow from "../components/trackRow.js";
import PlaylistTrackRow from "../components/playlistTrackRow.js";
import Sidebar from "../components/sidebar.js";
import Karaoke from "./karaokeView.js";
import "../styles/homeView.css";
import "../styles/nav.css";
import Player from "../components/player";
import { useNavigate } from "react-router-dom";
import { subscribeToStore } from "../store/store.js";
import TrackHistory from "../components/trackHistory.js";
import { getPlaylistTracks } from "../utils/api.js";


function HomeView(props) {
  const [isPlaying, setIsPlaying] = useState(false); // variable to keep track of playing state throughout the app
  const [currentTime, setCurrentTime] = useState(0);
  const [playState, setPlaystate] = useState(false);
  const [useKaraoke, setUseKaraoke] = useState(false);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    console.log("homeview is mounted")
    console.log(props);
  }, [])

  useEffect(() => {
    if(props.persistedData.dataisLoaded === true) {
        subscribeToStore(props.userInfo.userID.id);
    }
  }, [props.persistedData.dataisLoaded])

  let content = null;

  if (useKaraoke) {
    content = (
      <Karaoke
        currentTime={currentTime}
        isPlaying={isPlaying}
        props={props.currentTrack.id}
      />
    );
  } else if (playlistTracks) {
    content = (
      <div className="searchResults">
        <tbody>
          <tr>{playlistTracks.map(playlistTrackRenderCB)}</tr>
        </tbody>
      </div>
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
          {
            <Sidebar
              playlists={props.userPlayList.playlists}
              playlistClick={playlistClick}
            />
            }
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
          <div className="toggle">{useKaraoke ? 
          <div><button className="activeKaraoke" onClick={() => setUseKaraoke(!useKaraoke)}>Karaoke mode</button></div> : 
          <div><button className="inactiveKaraoke" onClick={() => setUseKaraoke(!useKaraoke)}>Karaoke mode</button></div>}
          </div>
          {content}
        </div>
        <TrackHistory data = {props.recentTracks} setCurrentTrack = {setCurrentTrack}/>
      </div>

      {props.currentTrack ? (
        <Player
          setIsPlaying={setIsPlaying}
          setCurrentTime={setCurrentTime}
          trackURI={"spotify:track:" + props.currentTrack.id}
          play={playState}
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

  function playlistTrackRenderCB(track) {
    function handleRowClick() {
      setCurrentTrack(track.track);
    }
    return (
      <tr key={track.id} onClick={handleRowClick}>
        <PlaylistTrackRow data={{ track }} />
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
      const accessToken = props.tokenInfo.accessToken;
      props.setSearchTerm(e.target.value)
      const searchTerm = props.searchTerm
      props.search({accessToken, searchTerm});
      setPlaylistTracks(false);
      setUseKaraoke(false);
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
    props.addToRecent(track);    
  }

  async function playlistClick(playlistId) {
    const tracks = await getPlaylistTracks(playlistId);
    const parsedData = Object.values(tracks);
    setUseKaraoke(false);
    setPlaylistTracks(parsedData);
  }
}

export default HomeView;

