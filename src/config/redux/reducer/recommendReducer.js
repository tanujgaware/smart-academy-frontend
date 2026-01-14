import { createSlice } from "@reduxjs/toolkit";
import { getMyRecommendations } from "../action/recommendAction";

const initialState={
    error:null,
    myRecommendations:[],
    loading:false
}

const recommendSlice=createSlice({
    name:"recommendations",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getMyRecommendations.pending,(state)=>{
            state.loading=true;
        })
        .addCase(getMyRecommendations.fulfilled,(state,action)=>{
            state.loading=false;
            state.myRecommendations=action.payload;
        })
        .addCase(getMyRecommendations.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
})

export default recommendSlice.reducer;