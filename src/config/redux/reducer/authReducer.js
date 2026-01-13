import { createSlice } from "@reduxjs/toolkit";
import { handleLogin, handleLogout, handleSignup, isAuthenticated } from "../action/authAction";

const initialState={
    loading:false,
    success:null,
    user:null,
    error:null,
    authenticated:null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(isAuthenticated.pending,(state)=>{
            state.loading=true;
        })
        .addCase(isAuthenticated.fulfilled,(state,action)=>{
            state.user=action.payload;
            state.authenticated=true;
            state.loading=false;
        })
        .addCase(isAuthenticated.rejected,(state,action)=>{
            state.loading = false;
            state.error=action.payload || "Failed TO Authenticate";
            state.authenticated = false;
        })
        
        .addCase(handleSignup.pending,(state,action)=>{
            state.loading=true;
        })
        
        .addCase(handleSignup.fulfilled,(state,action)=>{
            state.error=false;
            state.user=action.payload;
            state.loading=false;
        })
        .addCase(handleSignup.rejected,(state,action)=>{
            state.error=action.payload || "Failed To SignIn";
            state.loading=false
            state.user=null;
        })
        .addCase(handleLogin.pending,(state,action)=>{
            state.loading=true;
        })
        
        .addCase(handleLogin.fulfilled,(state,action)=>{
            state.error=action.payload || "Failed To Login";
            state.user=action.payload;
            state.loading=false;
        })
        .addCase(handleLogin.rejected,(state)=>{
            state.error=true;
            state.loading=false
            state.user=null;
        })
        .addCase(handleLogout.pending,(state)=>{
            state.loading=true;

        })
        .addCase(handleLogout.fulfilled,(state,action)=>{
            state.error=null;
            state.success=true;
            state.user=null;
        })
        .addCase(handleLogout.rejected,(state,action)=>{
            state.error=action.payload || "Failed TO Logout";
        })
    }
})

export default authSlice.reducer;