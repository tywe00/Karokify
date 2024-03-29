import React, { useState, useEffect } from "react";
import SongBox from "../components/songBox.js";
import TrackRow from "../components/trackRow.js";
import Sidebar from "../components/sidebar.js";
import "../styles/homeView.css";
import "../styles/nav.css";
import { getAlbum, getPlaylists } from "../utils/api.js";

function HomeView(props) {
  
  const [album, setAlbum] = useState(null);
  const [playlistsData, setPlaylists] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const albumData = await getAlbum(props.code);
      const playlistsData = await getPlaylists(props.code);
      setAlbum(albumData);
      setPlaylists(playlistsData);
    }
    fetchData();
  }, []);

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
