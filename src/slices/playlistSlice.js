import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playList: [],
}

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers:{
        addToPlaylist: (state, action) => {
            state.push(action.payload);
        },
        removeFromPlaylist: (state, action) => {
            return state.filter((playlist) => playlist.id !== action.payload);
        }
    }
});

export const {addToPlaylist, removeFromPlaylist} = playlistSlice.actions;

export const playlistReducer = playlistSlice.reducer;