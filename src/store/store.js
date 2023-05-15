import { configureStore } from "@reduxjs/toolkit";
import { playHistoryReducer } from "../slices/recentTracksSlice";
import { tokenReducer } from "../slices/tokenSlice";
import { userSpotifyPlistReducer } from "../slices/userSpotifyPlist";
import { currentPlayingReducer } from "../slices/currentPlayingSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { searchResultsReducer } from "../slices/searchResultSlice";
import persistToFirebase from "../persistance/firebaseModel";
import { userInfoReducer } from "../slices/userInfo";
import { persistedDataReducer } from "../slices/persistedDataSlice";

const persistConfig = {
    key: "root",
    version: 1, 
    storage
};

const reducer = combineReducers({
    userInfo : userInfoReducer,
    tokenInfo : tokenReducer,
    playedHistory : playHistoryReducer,
    userSpotifyPlayList : userSpotifyPlistReducer,
    searchResults : searchResultsReducer,
    currentTrack : currentPlayingReducer,
    persistedData : persistedDataReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer
})

export const subscribeToStore = (userID) => {
    console.log("subscription done")
    return store.subscribe(() => persistToFirebase(userID));
}


export default store;