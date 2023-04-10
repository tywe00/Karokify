import React, { useState, useEffect } from "react";
import SongBox from "../components/songBox.js";
import Sidebar from "../components/sidebar.js";
import "../styles/homeView.css";
import "../styles/nav.css";
import { getAlbum } from "../utils/api.js";

function HomeView(props) {
  const accessToken = localStorage.getItem("access_token");
  const data = {
    title: "Title",
    artist: "Artist",
  };

  const [album, setAlbum] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const albumData = await getAlbum();
      setAlbum(albumData);
    }

    fetchData();
  }, []);

  console.log(album);
  return (
    <div className="wrapper">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="mainContent">
        <input class="form-control" type="text" placeholder="Search" />
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
          <table>
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
      <td key={track.id}>
        <SongBox data={{ track, ...album.images }} />
      </td>
    );
  }
}

export default HomeView;
