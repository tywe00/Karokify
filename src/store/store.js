import { configureStore } from "@reduxjs/toolkit";
import { playHistoryReducer } from "../slices/recentTracksSlice";
import { tokenReducer } from "../slices/tokenSlice";
import { userSpotifyPlistReducer } from "../slices/userSpotifyPlist";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: "root",
    storage
};

const reducer = combineReducers({
    tokeninfo : tokenReducer,
    playedHistory : playHistoryReducer,
    userSpotifyPlayList : userSpotifyPlistReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer
})

export default store;