import React, { useState, useEffect } from "react";
import TrackRow from "../components/trackRow.js";
import Sidebar from "../components/sidebar.js";
import "../styles/homeView.css";
import "../styles/nav.css";
import { getPlaylists, getSearchResults } from "../utils/api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserSpotifyPlaylist } from "../slices/tokenSlice.js";
import { fetchPlayLists } from "../slices/userSpotifyPlist.js";

function HomeView(props) {
  
  const [playlistsData, setPlaylists] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userPlayList = useSelector((state) => state.userSpotifyPlayList.playlists);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    getPlaylists(accessToken).then(data => {
      setPlaylists(data);
    })
  }, []);

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
              <a href="#" onClick={logOutUser}>Log out</a>
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
