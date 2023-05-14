import React from "react";
import "../styles/trackRow.css";

function PlaylistTrackRow(props) {
  if (!props.data.track.track) {
    return null;
  }
  return (
    <div className="trackRow">
        <tr>
            {<td><img className="albumArt" src={props.data.track.track.album?.images?.[0]?.url ?? "./src/assets/noAlbum.png"} alt="Album Art"></img></td> }
            <td><p>{props.data.track.track.name}</p></td>
            <td><p>{props.data.track.track.artist}</p></td>
        </tr>
        <hr className="divider"></hr>
    </div>
  );
}

export default PlaylistTrackRow;
