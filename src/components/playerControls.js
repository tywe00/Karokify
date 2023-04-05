import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/sidebar.css";

function PlayerControls() {

    return <div className="player-controls">
     
        <table>
          <tbody>
            <tr>
                <td><button type="button" class="btn btn-primary">
                    PREV
                </button></td>
                <td><button type="button" class="btn btn-primary">
                    PLAY
                </button></td>
                <td><button type="button" class="btn btn-primary">
                    NEXT
                </button></td>
            </tr>
          </tbody>
        </table>
    </div>;
}

export default PlayerControls;