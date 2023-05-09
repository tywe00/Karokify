import React, { useState, useEffect } from "react";
import TrackRow from "../components/trackRow.js";
import Sidebar from "../components/sidebar.js";
import { getSearchResults } from "../utils/api.js";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/homeView.css";
import "../styles/nav.css";

function HomeView(props) {
  
  const [playlistsData, setPlaylists] = useState(props.userPlayList.playlists);
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();

 /*  useEffect(() => {
    console.log("this is from homeview")
    console.log(props.userPlayList)
    
  }, [props.userPlayList.loading]);
 */

  return (
    <div className="wrapper">
      <div className="sidebar">
        {<Sidebar playlists={props.userPlayList.playlists} />}
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
      //const accessToken = localStorage.getItem('access_token');
      const searchResults = await getSearchResults(props.accessToken, searchTerm);
      console.log()
      setSearchResults(searchResults);

    }
  }
}

function mapStateToProps(state) {
  return{
    userPlayList : state.userSpotifyPlayList,
    accessToken : state.tokenSlice
  };
}

export default connect(mapStateToProps)(HomeView);
