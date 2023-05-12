import React, { useState, useEffect } from "react";
import TrackRow from "../components/trackRow.js";
import Sidebar from "../components/sidebar.js";
import Karaoke from "./karaokeView.js";
import "../styles/homeView.css";
import "../styles/nav.css";
import Player from "../components/player";
import Navbar from "../components/navbar.js";
import { BsChatSquareQuote, BsChatSquareQuoteFill } from "react-icons/bs";
import { getAlbum, getPlaylists,getSearchResults } from "../utils/api.js";
import { useNavigate } from "react-router-dom";

//TODO: Add description of what a user can expect of karokify
//TODO: Add a header on top of sidebar to describe purpose
//TODO: Indicate the function of lyrics button
function HomeView(props) {
  const [track, setTrack] = useState(null);   //state to hold currently playing track
  const [player, setPlayer] = useState(<Player />); //state to hold the player component
  const [useKaraoke, setUseKaraoke] = useState(false); //state to hold a conditional value to render karokie view
  const [searchResults, setSearchResults] = useState(null);   //maybe create a presenter?
  
  const navigate = useNavigate();

  function setCurrentTrack(track) {
    console.log("setting track");
    setUseKaraoke(true);
    setTrack(track);
    console.log(track);
    setPlayer(
      <Player
        trackURI={"spotify:track:" + track.id}
      />
    );
  }


  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    console.log("this is from view")
    console.log(props.accessToken)
  }, []);


  return (
    <div className="homeView">
      <div className="wrapper">
        <div className="sidebar">
        {<Sidebar playlists={props.userPlayList.playlists} />}
        </div>
        <div className="mainContent">
        <div className="navbar">
      <div className="searchBar"><input className="form-control" onChange={handleSearch} type="text" placeholder="Search" /></div>
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

          { useKaraoke? ( 
            <Karaoke props={track.id} />
          ) : searchResults ? (
            <div className="searchResults">
              <tbody>
                <tr>{searchResults.map(searchResultsRenderCB)}</tr>
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

  async function handleSearch(e) {
    if (e.target.value.length > 2) {

      e.preventDefault();
      const searchTerm = e.target.value;
      const accessToken = localStorage.getItem('access_token');
      const searchResults = await getSearchResults(accessToken, searchTerm);
      console.log("this is token");
      console.log(props.accessToken.accessToken)
      setSearchResults(searchResults);

    }
  }
}

export default HomeView;
