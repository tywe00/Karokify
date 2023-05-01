import React from "react";
import "../styles/nav.css";

function Navibar(props) {
  return (
    <div className="navbar">
      <input className="form-control" type="text" placeholder="Search" /> 
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
  );
}

export default Navibar;
