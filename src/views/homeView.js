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

//TODO: Add description of what a user can expect of karokify
//TODO: Add a header on top of sidebar to describe purpose
//TODO: Indicate the function of lyrics button
function HomeView(props) {
  const [playState, setPlayState] = useState(false);
  const [album, setAlbum] = useState(null);
  const [track, setTrack] = useState(null);
  const [player, setPlayer] = useState(<Player />);
  const [useKaraoke, setUseKaraoke] = useState(false);
  const [playlistsData, setPlaylists] = useState(props.userPlayList.playlists);
  const [searchResults, setSearchResults] = useState(null); //maybe create a presenter?
  const navigate = useNavigate();

  function setCurrentTrack(track) {
    console.log("setting track");
    setUseKaraoke(true);
    setTrack(track);
    console.log(track);
    setPlayer(
      <Player
        persistDeviceSelection={true}
        syncExternalDevice={true}
        play={playState}
        trackURI={"spotify:track:" + track.id}
      />
    );
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    getPlaylists(accessToken).then((data) => {
      setPlaylists(data);
    });
    console.log("this is from view");
    console.log(props.accessToken);
  }, []);

  useEffect(() => {
    console.log("test");
    setPlayState(true);
  });

  return (
    <div className="homeView">
      <div className="wrapper">
        <div className="sidebar">
          {<Sidebar playlists={props.userPlayList.playlists} />}
        </div>
        <div className="mainContent">
          <div className="navbar">
            <div className="searchBar">
              <input
                className="form-control"
                onChange={handleSearch}
                type="text"
                placeholder="Search"
              />
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

          {useKaraoke ? (
            <button
              className="lyricsToggle"
              onClick={() => setUseKaraoke(!useKaraoke)}
            >
              <BsChatSquareQuoteFill />
            </button>
          ) : (
            <button
              className="lyricsToggle"
              onClick={() => setUseKaraoke(!useKaraoke)}
            >
              <BsChatSquareQuote />
            </button>
          )}
          {useKaraoke ? (
            <Karaoke props={track.id} />
          ) : searchResults ? (
            <div className="searchResults">
              <tbody>
                <tr>{searchResults.map(trackRenderCB)}</tr>
              </tbody>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      {player}
    </div>
  );

  function trackRenderCB(track) {
    function handleRowClick() {
      console.log(track.id);
      setCurrentTrack(track);
      //setPlayer(<Player play={true} trackURI={"spotify:track:" + trackURI} />);
    }

    return (
      <tr key={track.id} onClick={handleRowClick}>
        <TrackRow data={{ track }} />
      </tr>
    );
  }

  function logOutUser() {
    localStorage.clear();
    navigate("/");
  }

  async function handleSearch(e) {
    if (e.target.value.length > 2) {
      e.preventDefault();
      const searchTerm = e.target.value;
      const accessToken = localStorage.getItem("access_token");
      const searchResults = await getSearchResults(accessToken, searchTerm);
      console.log("this is token");
      console.log(props.accessToken);
      setSearchResults(searchResults);
    }
  }
}

export default HomeView;
