import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createElement } from "react";

export const isAuthenticated=createAsyncThunk(
    "/auth/authenticate",
    async(thunkAPI)=>{
        try{
            const response=await clientServer.get("/auth/me");
            return response.data.data;
        }catch(err){
            return thunkAPI.rejectwithValue(err.response.data);
        }
    }
)

export const handleLogin=createAsyncThunk(
    "auth/login",
    async(formData,thunkAPI)=>{
        try{
            const response=await clientServer.post("/auth/login",formData);
            return response.data.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const handleLogout=createAsyncThunk(
    "/auth/logout",
    async(__ , thunkAPI)=>{
        try{
            const response=await clientServer.post("/auth/logout");
            return response.data.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const handleSignup=createAsyncThunk(
    "/auth/register",
    async(formData,thunkAPI)=>{
        try{
            const response=await clientServer.post("/auth/register",formData);
            return response.data.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)