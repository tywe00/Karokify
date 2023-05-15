import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setRefreshToken } from "../slices/tokenSlice";
import { getUserInfo } from "../slices/userInfo";
import { fetchPlayLists } from "../slices/userSpotifyPlist";
import { fetchFromFirebase } from "../slices/persistedDataSlice";

function LoadingPageTwo() {

    const [ready, setReady] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('access_token');
            const refreshtoken = localStorage.getItem('refresh_token');
            if(token) {
                dispatch(setAccessToken(token));
                dispatch(setRefreshToken(refreshtoken));
                dispatch(fetchPlayLists(token));
                console.log("dispatched fetchplaylists");
                const userID = await dispatch(getUserInfo(token)).unwrap();
                dispatch(fetchFromFirebase(userID.id));
                setReady(true);                
            }
        }
        fetchData();
        if(ready) {
            //navigate("/persistingData");
            navigate("/homeView");

        }
    }, [ready]);

    return(
        <h1>Fetching data for the app ...</h1>
    );
}

export default LoadingPageTwo;