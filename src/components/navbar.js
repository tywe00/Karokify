import React from "react";
import HomeView from "../views/homeView";
import "../styles/nav.css";

function Navibar(props) {
  return (
    <div className="navbar">
      <div className="searchBar"><input className="form-control" onChange={HomeView.handleSearch} type="text" placeholder="Search" /></div>
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

/*
<input onChange={handleSearch} className="form-control" type="text" placeholder="Search" />
        <nav>
          <ul>
            
            <li>
              <a href="#" onClick={logOutUser}>log out</a>
            </li>
          </ul>
        </nav>
*/
