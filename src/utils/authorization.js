import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_CLIENT_SECRET } from "./authorizationKeys";

function handleLogin() {
    const scope = 'user-read-private user-read-email';
    const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`;
    window.location.href = url;
}

function handleCodeExchange(code) {
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`
        },
        body : `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        //return response;
        /* localStorage.clear();
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("expires_in", data.expires_in); */
        //console.log(localStorage);
      }) 
}  

function refreshAccessToken(refreshToken) {
    const url = 'https://accounts.spotify.com/api/token';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic + ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`
        },
        body : `grant_type=authorization_code&code=${refreshToken}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`
    }).then(response => response.json())
      .then(data => {
        localStorage.clear();
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("expires_in", data.expires_in);
        //localStorage.setItem("refreshToken", data.refreshToken);
      })
}

export {handleLogin, handleCodeExchange, refreshAccessToken};