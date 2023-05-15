import React, { useState, useEffect } from "react";
import { Lrc } from "react-lrc";
import "../styles/karaoke.css";
import { getCurrentPlaybackPosition } from "../utils/api";

const URL = "https://spotify-lyric-api.herokuapp.com/?trackid=";
const trackID = "6ich2xMH5AR39V85miIAN8";
//const api = URL + trackID + "&format=lrc";
//https://open.spotify.com/track/6ich2xMH5AR39V85miIAN8?si=a2160d7cc4394b40

function Karaoke(props) {
  const [lyrics, setLyrics] = useState([]);
  const [activeLine, setActiveLine] = useState(-1);
  const [playback, setPlayback] = useState(0);
  const [lyricAPIresult, setLyricAPIresult] = useState(0);

  useEffect(() => {
    getCurrentPlaybackPosition().then((data) => {
      setPlayback(data.progress_ms);
    });
  }, [props.onRender()]);

  function closeToTime(lineTime, playbackTime, ms) {
    return Math.abs(lineTime - playbackTime) < ms;
  }

  function closeToLine(lineNumber, playbackLine, ms) {
    return Math.abs(lineNumber - playbackLine) <= 2;
  }

  function lineRenderer(data) {
    const currentLineNumber = data.line.lineNumber;
    const lineTime = data.line.startMillisecond;
    const active = activeLine === currentLineNumber ? true : false;
    if (closeToTime(lineTime, playback, 750)) {
      setActiveLine(data.line.lineNumber);
    }

    if (closeToLine(currentLineNumber, activeLine)) {
      return (
        <div
          key={data.line.id}
          style={{
            fontSize: active ? "40px" : "30px",
            color: active ? "#eeeeee" : "#888888",
            fontWeight: active ? "bold" : "normal",
            lineHeight: active ? "2em" : "2em",
            textAlign: "center",
          }}
        >
          {data.line.content}
        </div>
      );
    }
  }

  function lineToLrcCB(line) {
    if (!line) return;
    if (!line.timeTag || !line.words) return;
    return String("[" + line.timeTag + "]" + line.words);
  }

  /*
    setLyricAPIresult ->
      0 = Loading lyrics
      1 = No lyrics availabel
      2 = Lyrics loaded
  */
  function fetchURL() {
    setLyricAPIresult(0);
    fetch(URL + props.currentTrack + "&format=lrc")
      .then((response) => response.json())
      .then((data) => {
        const lyrs = data.lines.map(lineToLrcCB);
        const str = lyrs.join("\n");
        setLyrics(str);
        setActiveLine(activeLine + 1);
        setLyricAPIresult(2);
      })
      .catch((err) => {
        setLyricAPIresult(1);
        console.log(err.message);
      });
  }
  useEffect(() => {
    fetchURL();
  }, []);

  // Makes sure playback gets updated if we change position in
  // the player on the current track
  useEffect(() => {
    if (props.currentTime != playback) {
      setPlayback(props.currentTime);
    }
  }, [props.currentTime]);

  // Fetch the real progress every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentPlaybackPosition().then((data) => {
        setPlayback(data.progress_ms);
      });
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function updateLocal() {
    let interval;
    if (props.isPlaying) {
      interval = setInterval(() => {
        setPlayback((playback) => playback + 50);
      }, 50);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }
    return interval;
  }

  // Update the playback position locally every second
  useEffect(() => {
    let localInterval;
    localInterval = updateLocal();
    return () => {
      clearInterval(localInterval);
    };
  }, [props.isPlaying]);

  function loading() {
    if (lyricAPIresult === 0) {
      return <h1>LOADING...</h1>;
    } else if (lyricAPIresult === 1) {
      return <h1>No lyrics available...</h1>;
    }
  }
  return (
    <div>
      {lyrics.length !== 0 ? (
        <div className="karaoke">
          <div className="lyrics">
            <Lrc
              className="lrc"
              style={{ overflow: "hidden !important" }}
              lrc={lyrics}
              lineRenderer={lineRenderer}
            />
          </div>
        </div>
      ) : (
        loading()
      )}
    </div>
  );
}

export default Karaoke;
