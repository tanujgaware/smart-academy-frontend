import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMyRecommendations=createAsyncThunk(
    "/recommend/me",
    async(__ ,thunkAPI)=>{
        try{
            const response=await clientServer.get("/recommend/v1");
            return response.data.data
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)