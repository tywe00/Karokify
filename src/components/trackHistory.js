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
        This is your play history
        {props.data.playHistoryList.map(item => {
          return (
          <div onClick={() => handleCLick(item)} key={item.name} className="historybox">
          
          <p style={{ display: "block" }}>{item.name}</p>
          
          
          </div>
      );
        })
        
        
        }

      </div>
  )
}

export default TrackHistory

