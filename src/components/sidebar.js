import React from "react";
import PlayerControls from "./playerControls";
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/sidebar.css";

function Sidebar() {
  
  return <div className="sidebar">
    <img className="sidebar-logo" src={require("../assets/karaokify.png")} />
    <div id="test">asd</div>
    <img className="album-art" src="https://www.udiscovermusic.com/wp-content/uploads/2022/01/The-Weeknd.jpg" />
    <PlayerControls/>
  </div>;
}

export default Sidebar;
