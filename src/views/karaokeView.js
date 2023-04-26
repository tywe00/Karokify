import React, { useState, useEffect } from "react";
import { Lrc } from "react-lrc";
import "../styles/karaoke.css";
import Player from "../components/player";
import { getCurrentPlaybackPosition } from "../utils/api";

const URL = "https://spotify-lyric-api.herokuapp.com/?trackid=";
const trackID = "5dNfHmqgr128gMY2tc5CeJ";
const api = URL + trackID + "&format=lrc";
//https://open.spotify.com/track/5dNfHmqgr128gMY2tc5CeJ?si=ad8c13bb270a4c4e

function Karaoke(props) {
  const [lyrics, setLyrics] = useState([]);
  const [activeLine, setActiveLine] = useState(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const [playback, setPlayback] = useState(0);

  function findActiveLineIndex(lines, currentPlaybackTime) {
    let activeLineIndex = -1;
    let smallestDiff = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < lines.length; i++) {
      const lineStartTime = lines[i].startMillisecond;
      const diff = Math.abs(currentPlaybackTime - lineStartTime);

      if (diff < smallestDiff) {
        activeLineIndex = i;
        smallestDiff = diff;
      }
    }

    return activeLineIndex;
  }

  function closeToTime(lineTime, playbackTime, ms) {
    return Math.abs(lineTime - playbackTime) < ms;
  }

  function closeToLine(lineNumber, playbackLine, ms) {
    return Math.abs(lineNumber - playbackLine) <= 3;
  }

  function lineRenderer(data) {
    const currentLineNumber = data.line.lineNumber;
    //const active = true ? currentLineNumber === activeLine : false;
    const lineTime = data.line.startMillisecond;
    const active = activeLine === currentLineNumber ? true : false;
    if (closeToTime(lineTime, playback, 250)) {
      setActiveLine(data.line.lineNumber);
    }

    if (closeToLine(currentLineNumber, activeLine)) {
      return (
        <div
          key={data.line.id}
          style={{
            fontSize: active ? "40px" : "30px",
            color: active ? "#eeeeee" : "#888888",
            //backgroundColor: active ? "#FFFFFF" : "#212121",
            fontWeight: active ? "bold" : "normal",
            lineHeight: active ? "2em" : "2em",
            margin: "20px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          {data.line.content}
        </div>
      );
    }
  }

  function CB(line) {
    if (!line) return;
    if (line.words.length === 1) return;
    if (!line.timeTag || !line.words) return;
    return String("[" + line.timeTag + "]" + line.words);
  }

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        const lyrs = data.lines.map(CB);
        const str = lyrs.join("\n");
        setLyrics(str);
        setActiveLine(activeLine + 1);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentPlaybackPosition().then((data) => {
        setPlayback(data.progress_ms);
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [playback]);

  return (
    <div>
      {lyrics.length !== 0 ? (
        <div className="karaoke">
          <div>
            <Lrc
              className="lrc"
              style={{ overflow: "hidden !important" }}
              lrc={lyrics}
              lineRenderer={lineRenderer}
            />
          </div>
          <div className="player-wrapper">
            <Player trackURI={"spotify:track:" + trackID} />
          </div>
        </div>
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  );
}

export default Karaoke;
