import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer.js";
import courseReducer from "./reducer/courseReducer.js";
import enrollmentReducer from "./reducer/enrollmentReducer.js";

const store=configureStore({
    reducer:{
        auth:authReducer,
        courses:courseReducer,
        enrollments:enrollmentReducer,
    }
})

export default store;