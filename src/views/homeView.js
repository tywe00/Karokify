import React, { useState, useEffect } from "react";
import TrackRow from "../components/trackRow.js";
import Sidebar from "../components/sidebar.js";
import Karaoke from "./karaokeView.js";
import "../styles/homeView.css";
import "../styles/nav.css";
import { getAlbum } from "../utils/api.js";
import Player from "../components/player";
import Navbar from "../components/navbar.js";
import { BsChatSquareQuote, BsChatSquareQuoteFill } from "react-icons/bs";


function HomeView(props) {
  const [playState, setPlayState] = useState(false);
  const [album, setAlbum] = useState(null);
  const [track, setTrack] = useState(null);
  const [player, setPlayer] = useState(<Player />);
  const [useKaraoke, setUseKaraoke] = useState(false);

  function setCurrentTrack(track) {
    console.log("setting track");
    setUseKaraoke(true);
    setTrack(track);
    console.log(track);
    setPlayer(
      <Player
        persistDeviceSelection={true}
        syncExternalDevice={true}
        play={playState}
        trackURI={"spotify:track:" + track.id}
      />
    );
  }

  useEffect(() => {
    async function fetchData() {
      const albumData = await getAlbum(props.code);
      setAlbum(albumData);
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log("test");
    setPlayState(true);
  });

  return (
    <div className="homeView">
      <div className="wrapper">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="mainContent">
          <div className="navbar">
            <Navbar/>
          </div>
          
          { useKaraoke? (
            <button className="lyricsToggle" 
            onClick={()=>setUseKaraoke(!useKaraoke)}>
            <BsChatSquareQuoteFill />
          </button>
          ) : (
            <button className="lyricsToggle" 
            onClick={()=>setUseKaraoke(!useKaraoke)}>
            <BsChatSquareQuote />
          </button>
          )}
          { useKaraoke? ( 
            <Karaoke props={track.id} />
          ) : album ? (
            <div className="searchResults"><table>
              <tbody>
                <tr>{album.tracks.items.map(trackRenderCB)}</tr>
              </tbody>
            </table></div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      {player}
    </div>
  );

  function trackRenderCB(track) {
    function handleRowClick() {
      console.log(track.id);
      setCurrentTrack(track);
      //setPlayer(<Player play={true} trackURI={"spotify:track:" + trackURI} />);
    }

    return (
      <tr key={track.id} onClick={handleRowClick}>
        <TrackRow data={{ track, ...album.images }} />
      </tr>
    );
  }
}

export default HomeView;
