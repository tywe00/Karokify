import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPlaylists } from "../utils/api";

const initialState = {
    loading: true,
    playlists: [],
    error:'',
}

export const fetchPlayLists = createAsyncThunk('user/playList', (accessToken) => {
    return getPlaylists(accessToken)
})

/* const playlists = data.items.map(item => {
    return {
      name: item.name,
      id: item.tracks.href.split('playlists/')[1]
    };
  }); */

const userSpotifyPlist = createSlice({
    name: 'userSpotifyPlist',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchPlayLists.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchPlayLists.fulfilled, (state,action) => {
            state.loading = false
            state.playlists = action.payload.items.map(item => {
                return {
                  name: item.name,
                  id: item.tracks.href.split('playlists/')[1]
                };
              });
            /* console.log("this is coming from store - 1")
            console.log(state.playlists) */
            state.error = ''
        })
        builder.addCase(fetchPlayLists.rejected, (state,action) => {
            state.loading = false
            state.playlists = []
            state.error = action.error.message
        })
    }
})

export const userSpotifyPlistReducer = userSpotifyPlist.reducer;