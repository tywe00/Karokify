import React from "react";
import "../styles/trackRow.css";

function PlaylistTrackRow(props) {
  if (!props.data.track.track) {
    return null;
  }
  return (
    <div className="trackRow">
        <table>
            
                <tr>
                {<td><img className="albumArt" src={props.data.track.track.album?.images?.[0]?.url ?? "./src/assets/noAlbum.png"} alt="Album Art"></img></td> }
                    <td>
                    <p style={{ display: "block" }}>{props.data.track.track.name}</p>
                    <p style={{ display: "block", color: "gray" }}>{props.data.track.track.artists[0].name}</p>
                    </td>
                </tr>
            
        </table>
    </div>
  );
}

export default PlaylistTrackRow;
