import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    track : null,
}

const currentPlayingSlice = createSlice({
    name: 'currentPlaying',
    initialState,
    reducers: {
        setCurrentPlaying: (state, action) => {
            state.track = action.payload;
        },
    }
});

export const { setCurrentPlaying } = currentPlayingSlice.actions;

export const currentPlayingReducer = currentPlayingSlice.reducer;