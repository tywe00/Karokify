import { configureStore } from "@reduxjs/toolkit";
import { playHistoryReducer } from "../slices/recentTracksSlice";
import { userinfoReducer } from "../slices/userinfoSlice";
import { userSpotifyPlistReducer } from "../slices/userSpotifyPlist";


const store = configureStore({
    reducer: {
        userinfo : userinfoReducer,
        playedHistory : playHistoryReducer,
        userSpotifyPlayList : userSpotifyPlistReducer,
    }
})

export default store;