import React from 'react';
import '../styles/songBox.css'

function SongBox(props) {
    return (
    <div className="songBox">
        <img className="albumArt" src="#"></img>
        <p>{props.data.title}</p>
        <p>{props.data.artist}</p>
    </div>
    );
}

export default SongBox;