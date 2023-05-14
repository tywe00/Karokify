import React from "react";
import "../styles/trackRow.css";

function TrackRow(props) {
  if (!props.data.track) {
    return null;
  }
  return (
    <div className="trackRow">
        <tr>
            <td><img className="albumArt" src={props.data.track.album?.images?.[0]?.url ?? "./src/assets/noAlbum.png"} alt="Album Art"></img></td>
            <td><p>{props.data.track.name}</p></td>
            <td><p>{props.data.track.artist}</p></td>
        </tr>
        <hr className="divider"></hr>
    </div>
  );
}

export default TrackRow;
