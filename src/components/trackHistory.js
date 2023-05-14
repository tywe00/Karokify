import React from 'react'
import "../styles/trackHistory.css";


function TrackHistory(props) {

  console.log(props.data)
    

    function handleCLick(item) {
        console.log(item)

        props.setCurrentTrack(item)
        
    }
    
    
  return (
    <div className="playHistory" >
        <h1>Recent played Tracks</h1>
        {props.data.playHistoryList.map(item => {
          return (
          <div onClick={() => handleCLick(item)} key={item.name} className="historybox">
          
          <p1 style={{ display: "block" }}>{item.name}</p1>
          
          
          </div>
      );
        })
        
        
        }

      </div>
  )
}

export default TrackHistory

