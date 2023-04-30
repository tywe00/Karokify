import React from "react";
import { useState,useEffect } from "react";
import { handleCodeExchange } from "../utils/authorization";
import { useNavigate } from "react-router";

function LoadingPage() {

    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        handleCodeExchange(code).then(data => {
            setToken(data.access_token);
            console.log("this is from loadingpage");
            console.log(data.access_token);
            console.log(data.refresh_token);
            if(token) {
                navigate("/homeView");
            }
        });
    }, [token]);

    return(
        <h1>Loading your home page ...</h1>
    );

}

export default LoadingPage;