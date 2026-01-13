import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const addNewCourse=createAsyncThunk(
    "/courses/new",
    async(formData,thunkAPI)=>{
        try{
            const response=await clientServer.post("/courses/",formData);
            return response.data.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)
export const publishCourse=createAsyncThunk(
    "/course/publish",
    async(id,thunkAPI)=>{
        try{
            const response=await clientServer.put(`courses/${id}/publish`);
            return response.data.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)
export const unpublishCourse=createAsyncThunk(
    "/courses/unpublish",
    async(courseId,thunkAPI)=>{
        try{
            const response=await clientServer.put(`courses/${courseId}/unpublish`);
            return response.data.data
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)
export const fetchPublishedCourses=createAsyncThunk(
    "courses/published",
    async(__ ,thunkAPI)=>{
        try{
            const response=await clientServer.get("/courses/published");
            return response.data.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const fetchMyCourses=createAsyncThunk(
    "courses/my",
    async(__ ,thunkAPI)=>{
        try{
            const response=await clientServer.get("/courses/mine");
            return response.data.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const fetchCourseById=createAsyncThunk(
    "courses/id",
    async(courseId,thunkAPI)=>{
        try{
            const response=await clientServer.get(`/courses/${courseId}`);
            return response.data.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const uploadCourseVid=createAsyncThunk(
    "/courses/vid",
    async({courseId,vidData},thunkAPI)=>{
        try{
            const response=await clientServer.post(`/courses/${courseId}/videos`,vidData);
            return response.data.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const getVideos=createAsyncThunk(
    "/course/vid",
    async(courseId,thunkAPI)=>{
        try{
            const response=await clientServer.get(`/courses/${courseId}/cnt`);
            return response.data.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)