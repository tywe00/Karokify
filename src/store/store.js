import { configureStore } from "@reduxjs/toolkit";
import { playHistoryReducer } from "../slices/recentTracksSlice";
import { tokenReducer } from "../slices/tokenSlice";
import { userSpotifyPlistReducer } from "../slices/userSpotifyPlist";
import { currentPlayingReducer } from "../slices/currentPlayingSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: "root",
    version: 1, 
    storage
};

const reducer = combineReducers({
    tokenInfo : tokenReducer,
    playedHistory : playHistoryReducer,
    userSpotifyPlayList : userSpotifyPlistReducer,
    currentPlaying : currentPlayingReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer
})

export default store;