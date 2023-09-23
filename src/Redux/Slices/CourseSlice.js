import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosinstance"
import toast from "react-hot-toast"

const initialState={
    courseData:[]
}

export const getAllCourses=createAsyncThunk("/course/get",async()=>{
    try{
        const response=axiosInstance.get("/courses");
        toast.promise(response,{
            loading:"loading course data",
            success:"courses loaded successfully",
            error:"failed to fetch te course",
        });
        return (await response).data.courses;

    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})

const courseSlice=createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled,(state,action)=>{
            console.log(action.payload);
            if(action.payload){
               
                state.courseData=[...action.payload];
            }
        })
    }
});

export default courseSlice.reducer;