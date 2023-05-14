import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setRefreshToken } from "../slices/tokenSlice";
import { getUserInfo } from "../slices/userInfo";
import { fetchPlayLists } from "../slices/userSpotifyPlist";

function LoadingPageTwo() {

    const [ready, setReady] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const refreshtoken = localStorage.getItem('refresh_token');
        if(token) {
            dispatch(setAccessToken(token));
            dispatch(setRefreshToken(refreshtoken));
            dispatch(getUserInfo(token));
            dispatch(fetchPlayLists(token));
            setReady(true);
        }
        if(ready) {
            navigate("/homeView");
        }
    }, [ready]);

    return(
        <h1>Fetching data for the app ...</h1>
    );
}

export default LoadingPageTwo;