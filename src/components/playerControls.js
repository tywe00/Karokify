import React from "react";
import "../styles/sidebar.css";

function PlayerControls() {
  return (
    <div className="player-controls">
      <table>
        <tbody>
          <tr>
            <td>
              <button type="button">PREV</button>
            </td>
            <td>
              <button type="button">PLAY</button>
            </td>
            <td>
              <button type="button">NEXT</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PlayerControls;
