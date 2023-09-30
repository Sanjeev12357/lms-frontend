import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice';

import RazorpaySlice from "./Slices/RazorpaySlice";
import LectureSlice from "./Slices/LectureSlice";
import StatsSlice from "./Slices/StatsSlice";
import CourseSlice from "./Slices/CourseSlice";

const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        course:CourseSlice,
        razorpay:RazorpaySlice,
        lecture:LectureSlice,
        stat:StatsSlice,
    },
    devTools:true
});
export default store;