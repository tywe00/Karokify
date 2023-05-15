import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFromFirebase } from "../slices/persistedDataSlice";

function LoadingPageThree() {

    const [ready, setReady] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if(userID) {
            dispatch(fetchFromFirebase(userID));
            setReady(true);
        }
        if(ready) {
            navigate("/homeView");
        }
    }, [ready]);

    return(
        <h1>Persisting data ...</h1>
    );
}

export default LoadingPageThree;