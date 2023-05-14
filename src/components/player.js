import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player(props) {
  function CB(player) {
    console.log(player);
    props.setIsPlaying(player.isPlaying);
    props.setCurrentTime(player.progressMs);
  }
  const token = localStorage.getItem("access_token");
  if (token) {
    return (
      <div>
        <SpotifyPlayer
          token={token}
          uris={props.trackURI ? [props.trackURI] : []}
          theme="black"
          layout="responsive"
          persistDeviceSelection={true}
          syncExternalDevice={true}
          play={props.play}
          callback={CB}
          hideAttribution="true"
          styles={{
            activeColor: "blue",
            color: "#eeeeee",
            bgColor: "#303030",
            trackArtistColor: "#666666",
            trackNameColor: "#999999",
            sliderHandleColor: "#eeeeee",
            sliderTrackColor: "grey",
            sliderColor: "#eeeeee",
            height: "80px",
          }}
        />
      </div>
    );
  } else {
    return null;
  }
}
