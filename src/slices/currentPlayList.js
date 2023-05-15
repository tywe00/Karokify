import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPlaylistTracks } from "../utils/api";

const initialState = {
    loading : true,
    playlistItems : [],
    error : '',
}

export const fetchCurrentPlayList = createAsyncThunk('user/currentPlaylist', (playlistId) => {
    return getPlaylistTracks(playlistId)
})

const currentPlaylist = createSlice({
    name: 'currentPlayList',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchCurrentPlayList.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCurrentPlayList.fulfilled, (state, action) => {
            state.loading = false
            state.playlistItems = action.payload
            state.error = ''
        })
        builder.addCase(fetchCurrentPlayList.rejected, (state, action) => {
            state.loading = false
            state.playlistItems = []
            state.error = action.error.message
        })
    }
})

export const currentPlayListReducer = currentPlaylist.reducer;
