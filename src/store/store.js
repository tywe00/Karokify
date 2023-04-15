import { configureStore } from "@reduxjs/toolkit";
import { playlistReducer } from "../slices/playlistSlice";
import { playHistoryReducer } from "../slices/recentTracksSlice";

const store = configureStore({
    reducer: {
        playlist : playlistReducer,
        playedHistory : playHistoryReducer,
    }
})

export default store;