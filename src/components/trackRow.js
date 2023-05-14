import React from "react";
import "../styles/trackRow.css";

function TrackRow(props) {

  if (!props.data.track) {
    return null;
  }
  return (
    <div className="trackRow">
      <table>
        <tbody>
          <tr>
            <td><img className="albumArt" src={props.data.track.album?.images?.[0]?.url ?? "./src/assets/noAlbum.png"} alt="Album Art"></img></td>
            <td>
              <p style={{ display: "block" }}>{props.data.track.name}</p>
              <p1 style={{ display: "block" }}>{props.data.track.artists[0].name}</p1>
            </td>
          </tr>
        </tbody>
      </table>
      <hr className="divider"></hr>

    </div>
  );
}

export default TrackRow;
