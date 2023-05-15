import React from 'react'
import "../styles/trackHistory.css";


function TrackHistory(props) {

  //console.log(props)

    


    function handleCLick(item) {
      
      props.setUseKaraoke(false)
      props.setCurrentTrack(item)
        
    }
    
    
  return (
    <div className="playHistory" >
        <h1>Recently played tracks</h1>
        {props.data.map(item => {
          return (
          <div onClick={() => handleCLick(item)} key={item.name} className="historybox">
            <table>
        <tbody>
          <tr>
            <td><img className="albumArt" src={item.album?.images?.[0]?.url ?? "./src/assets/noAlbum.png"} alt="Album Art"></img></td>
            <td>
              <p style={{ display: "block" }}>{item.name}</p>
              
            </td>
          </tr>
        </tbody>
      </table>
          </div>
      );})}
    </div>
  )
}

export default TrackHistory

