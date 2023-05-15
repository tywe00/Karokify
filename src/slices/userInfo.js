import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserSpotifyProfile } from "../utils/api";

const initialState = {
    userID : null,
    isLogged: false,
    loading : true,
    error : '',
}

export const getUserInfo = createAsyncThunk('user/userInfo', (accessToken) => {
    return getUserSpotifyProfile(accessToken)
}) 

const userInfo = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setuserID: (state, action) => {
            state.userID = action.payload
            state.isLogged = true
        }
    },
    extraReducers: builder => {
        builder.addCase(getUserInfo.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.loading = false
            state.userID = action.payload
            state.isLogged = true
            state.error = ''
        })
        builder.addCase(getUserInfo.rejected, (state,action) => {
            state.loading = false
            state.userID = ''
            state.isLogged = false
            state.error = action.error.message
        })
    } 
})

export const { setuserID } = userInfo.actions;

export const userInfoReducer = userInfo.reducer;