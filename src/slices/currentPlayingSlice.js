import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trackID : '',
}

const currentPlayingSlice = createSlice({
    name: 'currentPlaying',
    initialState,
    reducers: {
        setCurrentPlaying: (state, action) => {
            state.trackID = action.payload;
        },
    }
});

export const {setCurrentPlaying} = currentPlayingSlice.actions;

export const currentPlayingReducer = currentPlayingSlice.reducer;