import { createSlice } from "@reduxjs/toolkit";
import { getMyEnrollments } from "../action/enrollmentAction";

const initialState={
    loading:null,
    myenrollments:[],
    error:null,
}

const enrollmentSlice=createSlice({
    name:"enrollments",
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getMyEnrollments.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(getMyEnrollments.fulfilled,(state,action)=>{
            state.loading=false;
            state.myenrollments=action.payload;
        })
        .addCase(getMyEnrollments.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
})

export default enrollmentSlice.reducer;