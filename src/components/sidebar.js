import React from "react";
import PlayerControls from "./playerControls";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <img className="sidebar-logo" src={require("../assets/karaokify.png")} />
      <div className="playlists">
        <tr>
          <p>Playlist</p>
        </tr>
        <tr>
          <p>Another playlist</p>
        </tr>
        <tr>
          <p>Karaoke songs</p>
        </tr>
        <tr>
          <p>Daft Punk</p>
        </tr>
        <tr>
          <p>Lesspoint hits</p>
        </tr>
        <tr>
          <p>Singing in the car</p>
        </tr>
      </div>
      <img
        className="album-art"
        src="https://i.scdn.co/image/ab67616d0000b273b33d46dfa2635a47eebf63b2"
      />
      <PlayerControls />
    </div>
  );
}

export default Sidebar;
