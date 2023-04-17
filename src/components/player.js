import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player(trackURI) {
  const token = localStorage.getItem("access_token");
  if (token) {
    return (
      <div>
        <SpotifyPlayer token={token} uris={trackURI ? [trackURI] : []} />;
      </div>
    );
  } else {
    return null;
  }
}
