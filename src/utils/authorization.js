import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_CLIENT_SECRET } from "./authorizationKeys";

function generateRandomString(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  
    async function sha256(plain) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    }
  
    function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    }

    const hashed = await sha256(codeVerifier);
    return base64encode(hashed);
}

function handleLogin() {

    let codeVerifier = generateRandomString(128);
    generateCodeChallenge(codeVerifier).then(codeChallenge => {
        let state = generateRandomString(16);
        let scope = 'user-read-private user-read-email playlist-read-private streaming user-read-playback-state user-modify-playback-state';

        localStorage.removeItem('code_verifier');
        localStorage.setItem('code_verifier', codeVerifier);
        //console.log(localStorage);
        let args = new URLSearchParams({
            response_type: 'code',
            client_id: SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: SPOTIFY_REDIRECT_URI,
            state: state,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge
    });
        
        window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
   
}

function handleCodeExchange(code) {
    let codeVerifier = localStorage.getItem('code_verifier');
    let body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID,
      code_verifier: codeVerifier
    });

    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            //console.log(data);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('expires_in');            
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('expires_in', data.expires_in);
        })
        .catch(error => {
        console.error('Error:', error);
    });

}  

//To be updated later ...
function refreshAccessToken(refreshToken) {
    const url = 'https://accounts.spotify.com/api/token';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic + ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`
        },
        body : `grant_type=refrsh_token&code=${refreshToken}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`
    }).then(response => response.json())
      .then(data => {
        localStorage.clear();
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("expires_in", data.expires_in);
        //localStorage.setItem("refreshToken", data.refreshToken);
      })
}

export {handleLogin, handleCodeExchange, refreshAccessToken};