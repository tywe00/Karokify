import React from "react";
import "../styles/sidebar.css";

function Sidebar() {
  
  return <div className="sidebar">
    <img className="sidebar-logo" src={require("../assets/karaokify.png")} />
  </div>;
}

export default Sidebar;
