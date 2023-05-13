import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSearchResults } from "../utils/api";

const initialState = {
    searchTerm: '',
    loading: true,
    searchResults: [],
    error: '',
    promiseState: {
        promise: null,
        data: null,
        error: null,
    },
}

export const doSearch = createAsyncThunk('user/searchResults', ({accessToken, searchTerm}) => {
    console.log("this is from slice")
    console.log(searchTerm)
    return getSearchResults(accessToken, searchTerm)
})

const searchResults = createSlice({
    name: 'searchResults',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
        deleteSearchResults: (state) => {
            state.searchResults = []
        }
    },
    extraReducers: builder => {
        builder.addCase(doSearch.pending, (state, action) => {
            state.loading = true
            state.results = []
            state.error = null
            state.promiseState = {
            promise: action.meta.requestId,
            data: null,
            error: null,
            }
        })
        builder.addCase(doSearch.fulfilled, (state,action) => {
            if (state.promiseState.promise !== action.meta.requestId) return;
            state.loading = false
            state.searchResults = action.payload
            state.error = ''
        })
        builder.addCase(doSearch.rejected, (state,action) => {
            if (state.promiseState.promise !== action.meta.requestId) return;
            state.loading = false
            state.searchResults = []
            state.error = action.error.message
        })
    }
})

export const { deleteSearchResults, setSearchTerm } = searchResults.actions; 

export const searchResultsReducer = searchResults.reducer;