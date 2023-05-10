import React from "react";
import { handleLogin } from "../utils/authorization";
import "../styles/login.css";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=a00c7f11626f4ae2b1d2cfe4d8a96e6e&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <div className="login_page">
      <div className="logo  fade-in"></div>
      <div className="app_info half_delay fade-in fancy_text ">
        <p>Your favourite karaoke app</p>
        <p>powered by </p>
        <img
          className="spotify_logo"
          src="https://www.logo.wine/a/logo/Spotify/Spotify-Icon-Logo.wine.svg"
          alt="SVG"
        />
      </div>

      <div className="login_btn_center full_delay fade-in">
        <button className="login_btn" onClick={handleLogin}>
          Login with Spotify
        </button>
        {/* <a className='login_btn ' href={AUTH_URL}>LOGIN WITH SPOTIFY</a> */}
      </div>
    </div>
  );
}
