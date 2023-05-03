import React, { useState, useEffect } from "react";
import SongBox from "../components/songBox.js";
import TrackRow from "../components/trackRow.js";
import Sidebar from "../components/sidebar.js";
import "../styles/homeView.css";
import "../styles/nav.css";
import { getAlbum, getPlaylists,getSearchResults } from "../utils/api.js";
import { useNavigate } from "react-router-dom";

function HomeView(props) {
  
  const [album, setAlbum] = useState(null);
  const [playlistsData, setPlaylists] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
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
        <input onChange={handleSearch} className="form-control" type="text" placeholder="Search" />
        <nav>
          <ul>
            
            <li>
              <a href="#" onClick={logOutUser}>log out</a>
            </li>
          </ul>
        </nav>

        {searchResults ? (
          <table className="searchResults">
            <tbody>
              <tr>{searchResults.map(trackRenderCB)}</tr>
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
      console.log()
      setSearchResults(searchResults);

    }
    

  }
}

export default HomeView;
