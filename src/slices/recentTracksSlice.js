import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recentTracksList: [],
}

const recentTracksSlice = createSlice({
    name: 'recentTracks',
    initialState,
    reducers: {
        addTrack: (state, action) => {
            const length = state.recentTracksList.unshift(action.payload);  //add track at beginning of list
            if(length > 10) {     //remove the last one in list
                state.recentTracksList.pop();
            }
        },
        setRecentTracksList: (state, action) => {
            state.recentTracksList = action.payload;
        }
    }
});

export const { addTrack, setRecentTracksList } = recentTracksSlice.actions;

export const playHistoryReducer = recentTracksSlice.reducer;