import React, { useState, useEffect } from "react";
import SongBox from "../components/songBox.js";
import TrackRow from "../components/trackRow.js";
import Sidebar from "../components/sidebar.js";
import "../styles/homeView.css";
import "../styles/nav.css";
import { getAlbum } from "../utils/api.js";
import Player from "../components/player";


function HomeView(props) {
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const albumData = await getAlbum(props.code);
      setAlbum(albumData);
    }
    fetchData();
  }, []);

  return (
    <div classname="homeView">
    <div className="wrapper">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="mainContent">
        <input className="form-control" type="text" placeholder="Search" />
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Settings</a>
            </li>
            <li>
              <a href="#">Log Out</a>
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
    <Player trackURI={"spotify:track:68Dni7IE4VyPkTOH9mRWHr"} />
    </div>
  );

  function trackRenderCB(track) {
    return (
      <tr key={track.id}>
        <TrackRow data={{ track, ...album.images }} />
      </tr>
    );
  }
}

export default HomeView;
