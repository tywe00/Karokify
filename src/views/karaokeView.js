import React, { useState, useEffect } from "react";
import { Lrc } from "react-lrc";
import "../styles/karaoke.css";

const URL = "https://spotify-lyric-api.herokuapp.com/?trackid=";
const trackID = "11dFghVXANMlKmJXsNCbNl";
const api = URL + trackID + "&format=lrc";

function Karaoke(props) {
  const [lyrics, setLyrics] = useState([]);
  const [activeLine, setActiveLine] = useState(-1);

  function lineRenderer(data) {
    const currentLineNumber = data.line.lineNumber;
    const active = true ? currentLineNumber === activeLine : false;
    return (
      <div
        key={data.line.id}
        style={{
          color: active ? "red" : "black",
          backgroundColor: active ? "blue" : "white",
          fontWeight: active ? "bold" : "normal",
        }}
      >
        {data.line.content}
      </div>
    );
  }

  function CB(line) {
    if (!line) return;
    if (line.words.length === 1) return;
    if (!line.timeTag || !line.words) return;
    return String("[" + line.timeTag + "]" + line.words);
  }

  function increment() {
    console.log(activeLine);
    setTimeout(() => {
      setActiveLine(activeLine + 1);
    }, 3000);
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

  return (
    increment(),
    (
      <div>
        {lyrics.length != 0 ? (
          <div className="karaoke">
            <Lrc
              className="lrc"
              style={{ overflow: "hidden !important" }}
              lrc={lyrics}
              lineRenderer={lineRenderer}
            />
          </div>
        ) : (
          <h1>LOADING...</h1>
        )}
      </div>
    )
  );
}

export default Karaoke;
