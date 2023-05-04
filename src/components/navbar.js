import React from "react";
import "../styles/nav.css";

function Navibar(props) {
  return (
    <div className="navbar">
      <div className="searchBar"><input className="form-control" type="text" placeholder="Search" /></div>
      <div className="menu">
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Log Out</a>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  );
}

export default Navibar;
