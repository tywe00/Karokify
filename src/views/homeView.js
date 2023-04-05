import React from 'react';
import SongBox from '../components/songBox.js'
import  '../styles/nav.css';

function HomeView(props) {
    const data = {
        title: 'Title',
        artist: 'Artist'
    };
    return (
        <div>
            <nav >
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Log Out</a></li>
                </ul>
            </nav>


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