import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice';
import courseSliceReducer from "./Slices/CourseSlice";
import RazorpaySlice from "./Slices/RazorpaySlice";
import LectureSlice from "./Slices/LectureSlice";
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        course:courseSliceReducer,
        razorpay:RazorpaySlice,
        lecture:LectureSlice,
    },
    devTools:true
});
export default store;