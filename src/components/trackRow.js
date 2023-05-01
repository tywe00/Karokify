import React from "react";
import "../styles/trackRow.css";

function TrackRow(props) {
  //function handleRowClick(event) {
  //  console.log(props.data.track);
  //}

  return (
    <div className="trackRow">
      <tr>
        <td>
          <img className="albumArt" src={props.data[0].url}></img>
        </td>
        <td>
          <p>{props.data.track.name}</p>
        </td>
      </tr>
      <hr className="divider"></hr>
    </div>
  );
}

export default TrackRow;
