import React, { useState, useEffect } from "react";
import SongBox from "../components/songBox.js";
import TrackRow from "../components/trackRow.js";
import Sidebar from "../components/sidebar.js";
import "../styles/homeView.css";
import "../styles/nav.css";
import { getAlbum, getPlaylists } from "../utils/api.js";
import { useNavigate } from "react-router-dom";

function HomeView(props) {
  
  const [album, setAlbum] = useState(null);
  const [playlistsData, setPlaylists] = useState(null);
  const navigate = useNavigate();

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

  return (
    <div className="wrapper">
      <div className="sidebar">
        {playlistsData && <Sidebar playlists={playlistsData} setAlbumData={props.setAlbumData} />}
      </div>
      <div className="mainContent">
        <input className="form-control" type="text" placeholder="Search" />
        <nav>
          <ul>
            
            <li>
              <a href="#" onClick={logOutUser}>log out</a>
            </li>
          </ul>
        </nav>

        {album ? (
          <table className="searchResults">
            <tbody>
              <tr>{album.tracks.items.map(trackRenderCB)}</tr>
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );

  function trackRenderCB(track) {
    return (
      <tr key={track.id}>
        <TrackRow data={{ track, ...album.images }} />
      </tr>
    );
  }

  function logOutUser() {
    localStorage.clear();
    navigate('/');
    
  }
}

export default HomeView;
