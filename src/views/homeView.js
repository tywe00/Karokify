import React from "react";
import SongBox from "../components/songBox.js";
import Sidebar from "../components/sidebar.js";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/homeView.css';

function HomeView(props) {
  const data = {
    title: "Title",
    artist: "Artist",
  };
  const list = [
    {
      title: "Title1",
      artist: "Artist",
    },
    {
      title: "Title",
      artist: "Artist",
    },
  
  ];
  return (
    <div className="wrapper">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="mainContent">
        <input class="form-control w-75" type="text" placeholder="Search"/>
        <table>
          <tbody>
            <tr>{list.map(callbackCB)}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  function callbackCB(listElement) {
    return (
      <td>
        <SongBox data={listElement} />
      </td>
    );
  }
}

export default HomeView;
