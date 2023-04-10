import React from "react";
import "../styles/songBox.css";

function SongBox(props) {
  //console.log(props);
  return (
    <div className="songBox">
      <img className="albumArt" src={props.data[0].url}></img>
      <p>{props.data.track.name}</p>
    </div>
  );
}

export default SongBox;
