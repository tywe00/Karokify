import React from "react";
import PlayerControls from "./playerControls";
import "../styles/sidebar.css";
import Player from "./player";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <img className="sidebar-logo" src={require("../assets/karaokify.png")} />
      <div className="playlists">
      {props.playlists ? (
        <table>
          <tbody>{props.playlists.map(playlistsRenderCB)}</tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </div>
  );

  function playlistsRenderCB(playlist) {
    return <ul key={playlist.id}>{playlist.name}</ul>;
  }
}

export default Sidebar;

/*
<img
        className="album-art"
        src="https://i.scdn.co/image/ab67616d0000b273b33d46dfa2635a47eebf63b2"
      />*/
