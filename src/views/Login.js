import React from 'react';
import { useEffect } from 'react';
import '../styles/login.css';


const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=bacf3feb739549c986cf242ff05225b8&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

function extractTokenAfterAuth(hash) {
    const urlParams = new URLSearchParams(hash);
    const token = urlParams.get('code');
    return token;
}

function putToken() {
    if(window.location.hash) {
        const access_token = extractTokenAfterAuth(window.location.hash);
        console.log("This is access_token");
        console.log(access_token);
        localStorage.clear();
        localStorage.setItem("access_token", access_token);
    }
}


export default function Login(){
    
    return (

        <div className='login_page '>
            <div className='logo  fade-in'>
            </div>
            <div className='app_info half_delay fade-in fancy_text '>
                <p>Your favourite karaoke app</p>
                <p>powered by spotify</p>

            </div>
            
            <div className='login_btn_center full_delay fade-in'>
                <a className='login_btn ' href={AUTH_URL}>LOGIN WITH SPOTIFY</a>
            </div>
        </div>

    )
}