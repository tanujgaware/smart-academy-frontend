import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const handleEnrollment=createAsyncThunk(
    "/courses/enroll",
    async(courseId,thunkAPI)=>{
        try{    
            const response=await clientServer.post(`enrollments/${courseId}`);
            return response.data.data;
        }catch(err){    
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const getMyEnrollments=createAsyncThunk(
    "/enrollments/my",
    async(__ ,thunkAPI)=>{
        try{
            const response=await clientServer.get("/enrollments/me");
            return response.data.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)