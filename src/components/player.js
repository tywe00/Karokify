import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player(props) {
  const token = localStorage.getItem("access_token");
  if (token) {
    console.log(props.trackURI);
    return (
      <div>
        <SpotifyPlayer 
          token={token} 
          uris={props.trackURI ? [props.trackURI] : []}
          theme = 'black'
        />
      </div>
    );
  } else {
    return null;
  }
}
