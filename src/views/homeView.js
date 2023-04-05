import React from "react";
import SongBox from "../components/songBox.js";
import Sidebar from "../components/sidebar.js";

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
    {
      title: "Title",
      artist: "Artist",
    },
    {
      title: "Title",
      artist: "Artist",
    },
  ];
  return (
    <div id="wrapper">
      <Sidebar />

      <div id="main">
        <h1>{props.data.title}</h1>
        <p>{props.data.content}</p>
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
