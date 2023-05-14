import React, { useState, useEffect } from "react";
import TrackRow from "../components/trackRow.js";
import PlaylistTrackRow from "../components/playlistTrackRow.js";
import Sidebar from "../components/sidebar.js";
import Karaoke from "./karaokeView.js";
import "../styles/homeView.css";
import "../styles/nav.css";
import Player from "../components/player";
import Navbar from "../components/navbar.js";
import { BsChatSquareQuote, BsChatSquareQuoteFill } from "react-icons/bs";
import {
  getAlbum,
  getPlaylists,
  getSearchResults,
  getPlaylistTracks,
  getUserInfo,
} from "../utils/api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doSearch } from "../slices/searchResultSlice.js";
import TrackHistory from "../components/trackHistory.js";
import { playHistory } from "../data/historyData.js";

//TODO: Add description of what a user can expect of karokify
//TODO: Add a header on top of sidebar to describe purpose
//TODO: Indicate the function of lyrics button
function HomeView(props) {
  const [isPlaying, setIsPlaying] = useState(false); // variable to keep track of playing state throughout the app
  const [currentTime, setCurrentTime] = useState(0);
  const [playState, setPlaystate] = useState(false);
  const [album, setAlbum] = useState(null);
  const [track, setTrack] = useState(null);
  const [player, setPlayer] = useState(<Player />);
  const [useKaraoke, setUseKaraoke] = useState(false);
  const [playlistsData, setPlaylists] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const navigate = useNavigate();
  let user_ID = getUserInfo(localStorage.getItem("access_token")).then(
    (data) => {
      user_ID = data.id;
    }
  );

  useEffect(() => {
    console.log("homeview is mounted");
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    getPlaylists(accessToken).then((data) => {
      setPlaylists(data);
    });
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
          {playlistsData && (
            <Sidebar
              playlists={playlistsData}
              playlistClick={playlistClick}
              setAlbumData={props.setAlbumData}
            />
          )}
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
        <TrackHistory data={playHistory} setCurrentTrack={setCurrentTrack} />
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
      //setPlayer(<Player play={true} trackURI={"spotify:track:" + trackURI} />);
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
      const accessToken = localStorage.getItem("access_token");
      props.setSearchTerm(e.target.value);
      const searchTerm = props.searchTerm;
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
    props.addToRecent(track.id);
    //ids = playHistory
    for (let i = 0; i < playHistory.playHistoryList.length; i++) {
      if (playHistory.playHistoryList[i].id === track.id) {
        playHistory.playHistoryList.splice(i, 1);
      }
    }
    playHistory.playHistoryList.unshift(track);
  }

  async function playlistClick(playlistId) {
    const tracks = await getPlaylistTracks(playlistId);
    const parsedData = Object.values(tracks);
    setUseKaraoke(false);
    setSearchResults(false);
    props.setSearchTerm(false);
    console.log("hejsan");
    setPlaylistTracks(parsedData);
  }
}

export default HomeView;
