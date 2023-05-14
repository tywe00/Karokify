import React from 'react'
import {playHistory} from '../data/historyData';
import "../styles/trackHistory.css";


function TrackHistory(props) {
    console.log(playHistory)

    function handleCLick(item) {
        console.log(item)
        props.setCurrentTrack(item)
    }
    console.log(props)
  return (
    <div className="playHistory" >
        This is your play history
        {props.data.playHistoryList.map(item => {
          return (
          <div onClick={() => handleCLick(item)} key={item.name} className="historybox">
          <p>{item.name}</p>
          
          </div>
      );
        })
        
        
        }

      </div>
  )
}

export default TrackHistory

