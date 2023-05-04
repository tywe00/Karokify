import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recentTracksList: [],
}

const recentTracksSlice = createSlice({
    name: 'recentTracks',
    initialState,
    reducers: {
        addTrack: (state, action) => {
            state.unshift(action.payload);  //add track at beginning of list
            if(state.length > 10) {     //remove the last one in list
                state.pop();
            }
        }
    }
});

export const addTrack = recentTracksSlice.actions;

export const playHistoryReducer = recentTracksSlice.reducer;