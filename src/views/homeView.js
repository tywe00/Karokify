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

function HomeView(props) {
  const [playState, setPlayState] = useState(false);
  const [album, setAlbum] = useState(null);
  const [track, setTrack] = useState(null);
  const [player, setPlayer] = useState(<Player />);
  const [useKaraoke, setUseKaraoke] = useState(false);
  const [playlistsData, setPlaylists] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
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
    async function fetchData() {
      const accessToken = localStorage.getItem('access_token');
      const albumData = await getAlbum(accessToken);
      const playlistsData = await getPlaylists(accessToken);
      setAlbum(albumData);
      setPlaylists(playlistsData);
    }

    fetchData();
  }, [album, playlistsData]);

  useEffect(() => {
    console.log("test");
    setPlayState(true);
  });

  return (
    <div className="homeView">
      <div className="wrapper">
        <div className="sidebar">
        {playlistsData && <Sidebar playlists={playlistsData} setAlbumData={props.setAlbumData} />}
        </div>
        <div className="mainContent">
          <div className="navbar">
            <Navbar/>
          </div>
<input onChange={handleSearch} className="form-control" type="text" placeholder="Search" />
        <nav>
          <ul>
            
            <li>
              <a href="#" onClick={logOutUser}>log out</a>
            </li>
          </ul>
        </nav>
          
          { useKaraoke? (
            <button className="lyricsToggle" 
            onClick={()=>setUseKaraoke(!useKaraoke)}>
            <BsChatSquareQuoteFill />
          </button>
          ) : (
            <button className="lyricsToggle" 
            onClick={()=>setUseKaraoke(!useKaraoke)}>
            <BsChatSquareQuote />
          </button>
          )}
          { useKaraoke? ( 
            <Karaoke props={track.id} />
          ) : searchResults ? (
            <table className="searchResults">
              <tbody>
                <tr>{album.tracks.items.map(trackRenderCB)}</tr>
              </tbody>
            </table></div>
          ) : (
            <p>Loading...</p>
          )}
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
        <TrackRow data={{ track, ...album.images }} />
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
      console.log()
      setSearchResults(searchResults);

    }
    

  }
}

export default HomeView;
