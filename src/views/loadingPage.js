import React from "react";
import { useState,useEffect } from "react";
import { handleCodeExchange } from "../utils/authorization";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken, setUserSpotifyPlaylist } from "../slices/userinfoSlice";
import { fetchPlayLists } from "../slices/userSpotifyPlist";

function LoadingPage() {

    const [codeFlag, setcodeFlag] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        handleCodeExchange(code).then(data => {
            dispatch(setAccessToken(data.access_token));
            dispatch(setRefreshToken(data.refresh_token));
            dispatch(fetchPlayLists(data.access_token));
            setcodeFlag(true);
        });
        if(codeFlag) {
            navigate("/homeView");
        }
    }, [codeFlag]);

    return(
        <h1>Loading your home page ...</h1>
    );

}

export default LoadingPage;