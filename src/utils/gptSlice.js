import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice({
    name:'gpt',
    initialState:{
        showGptSearch:false,
        key:null,
        movieNames:null,
        tmdbMovieResults:null,
    },
    reducers:{
        toggleGptSearchView:(state)=>{
            state.showGptSearch=!state.showGptSearch;
        },
        addOpenaiKey:(state,action)=>{
            state.key=action.payload
        },
        addGptMovieResult:(state,action)=>{
            const {movieNames,tmdbMovieResults}=action.payload;
            state.movieNames=movieNames;
            state.tmdbMovieResults=tmdbMovieResults;
        }

    }
});

export const{toggleGptSearchView,addOpenaiKey,addGptMovieResult}=gptSlice.actions;
export default gptSlice.reducer;