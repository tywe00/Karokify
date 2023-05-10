import { configureStore } from "@reduxjs/toolkit";
import { playHistoryReducer } from "../slices/recentTracksSlice";
import { tokenReducer } from "../slices/tokenSlice";
import { userSpotifyPlistReducer } from "../slices/userSpotifyPlist";

const store = configureStore({
    reducer: {
        tokeninfo : tokenReducer,
        playedHistory : playHistoryReducer,
        userSpotifyPlayList : userSpotifyPlistReducer,
    }
})

export default store;