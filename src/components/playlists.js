import React from "react";
import "../styles/playlists.css";

function Playlists(props) {
    function renderPlaylistsCB(listElement) {
        return (
          <p>{listElement}</p>
        );
      }

    return <div className="playlists">
        <table>
          <tbody>
            <tr>{props.playlists.map(renderPlaylistsCB)}</tr>
          </tbody>
        </table>
    </div>;
}

export default Playlists;