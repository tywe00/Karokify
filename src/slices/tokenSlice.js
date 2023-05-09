import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken : null,
    refreshToken : null,
}

const tokenSlice = createSlice({
    name: 'userinfo',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
    }
});

export const { setAccessToken, setRefreshToken, setUserSpotifyPlaylist } = tokenSlice.actions;

export const tokenReducer = tokenSlice.reducer;