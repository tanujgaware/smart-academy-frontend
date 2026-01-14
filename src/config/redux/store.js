import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer.js";
import courseReducer from "./reducer/courseReducer.js";
import enrollmentReducer from "./reducer/enrollmentReducer.js";
import recommendReducer from "./reducer/recommendReducer.js";

const store=configureStore({
    reducer:{
        auth:authReducer,
        courses:courseReducer,
        enrollments:enrollmentReducer,
        recommend:recommendReducer,
    }
})

export default store;