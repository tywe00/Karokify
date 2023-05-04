import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken : null,
    refreshToken : null,
    userSpotifyPlaylist : null,
}

const userinfoSlice = createSlice({
    name: 'userinfo',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        setUserSpotifyPlaylist: (state, action) => {
            state.userSpotifyPlaylist = action.payload;
        },
    }
});

export const { setAccessToken, setRefreshToken, setUserSpotifyPlaylist } = userinfoSlice.actions;

export const userinfoReducer = userinfoSlice.reducer;