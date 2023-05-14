import React from "react";
import { useState,useEffect } from "react";
import { handleCodeExchange } from "../utils/authorization";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../slices/tokenSlice";
import { fetchPlayLists } from "../slices/userSpotifyPlist";
import { getUserInfo, setuserID } from "../slices/userInfo";
import { getUserSpotifyProfile } from "../utils/api";

function LoadingPage() {

    const [codeFlag, setcodeFlag] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function getToken() {
            const code = new URLSearchParams(window.location.search).get("code");
            const data = await handleCodeExchange(code);
            if(data) {
                setcodeFlag(true);
            }
            if(codeFlag) {
                navigate("/fetchingData");
            }
        }
        getToken();
    }, [codeFlag]);

    return(
        <h1>Loading your home page ...</h1>
    );

}

export default LoadingPage;