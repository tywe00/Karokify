import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../persistance/firebaseConfig'
import { getDatabase, ref, get } from "firebase/database";
import { setRecentTracksList } from "./recentTracksSlice";
import { setCurrentPlaying } from "./currentPlayingSlice";

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const PATH = "Karokify/Users/";

const initialState = {
    persistedData: null,
    loading: true,
    dataisLoaded: false,
    error: '',
}

export const fetchFromFirebase = createAsyncThunk('user/persistedData', async(userID, thunkAPI) =>{
    const rf = ref(db, PATH+userID);
    const snapshot = await get(rf);
    if(snapshot.exists()) {
        const data = snapshot.val();
        thunkAPI.dispatch(setRecentTracksList(data.playedTracks.recentTracksList));
        thunkAPI.dispatch(setCurrentPlaying(data.currentTrack.track));
        return snapshot.val();
    }
})

const persistedData = createSlice({
    name: 'persistedData',
    initialState, 
    extraReducers: builder => {
        builder.addCase(fetchFromFirebase.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchFromFirebase.fulfilled, (state, action) => {
            state.loading = false
            state.persistedData = action.payload
            state.dataisLoaded = true
            state.error = '' 
        })
        builder.addCase(fetchFromFirebase.rejected, (state, action) => {
            state.loading = false
            state.persistedData = null
            state.dataisLoaded = false
            state.error = action.error.message
        })
    }
})

export const persistedDataReducer = persistedData.reducer;