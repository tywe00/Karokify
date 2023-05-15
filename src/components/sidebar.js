import React from "react";
import PlayerControls from "./playerControls";
import "../styles/sidebar.css";
import Player from "./player";
import playlistClick from "../views/homeView.js"

function Sidebar(props) {
  return (
    <div className="sidebar">
      <img className="sidebar-logo" src={require("../assets/karaokify.png")} />
      <div className="playlists">
      {props.playlists ? (  
          props.playlists.map(playlistsRenderCB)
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </div>
  );

  function playlistsRenderCB(playlist) {
    return <ul key={playlist.id} onClick={() => props.playlistClick(playlist.id)}>{playlist.name}</ul>;
  }
}

export default Sidebar;