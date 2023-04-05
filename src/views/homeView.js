import React from 'react';
import SongBox from '../components/songBox.js'

function HomeView(props) {
    const data = {
        title: 'Title',
        artist: 'Artist'
    };
    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
            <table>
                <tbody>
                    <tr>
                        <td><SongBox data={data}/></td>
                        <td><SongBox data={data}/></td>
                        <td><SongBox data={data}/></td>
                        <td><SongBox data={data}/></td>
                     </tr>
                </tbody>
            </table>
        </div>
    );
}

export default HomeView;