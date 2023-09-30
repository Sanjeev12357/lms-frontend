import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance";
const initialState={
    lectures:[]
}

export const getCourseLectures=createAsyncThunk("/course/lecture/get",async(cid)=>{
    try{
        const response = await axiosInstance.get(`/courses/${cid}`);
        toast.promise(response,{
            loading:"fetching course lectures",
            success:"lectures fetched successfully",
            error:"failed to load the lectures",
        });
        return(await response).data;

    }catch(error){
        toast.error("failed to fetch");
    }
})

export const addCourseLectures=createAsyncThunk("/course/lecture/add",async(data)=>{
    try{

        const formData=new FormData();
        formData.append("lecture",data.lecture);
        formData.append("title",data.title);
        formData.append("description",data.description);
        const response = await axiosInstance.post(`/courses/${data.id}`,formData);

        toast.promise(response,{
            loading:"adding course lectures",
            success:"lectures added successfully",
            error:"failed to add the lectures",
        });
        return(await response).data;

    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})

export const deleteCourseLectures=createAsyncThunk("/course/lecture/delete",async(data)=>{
    try{
        const response = await axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);

        toast.promise(response,{
            loading:"deleting course lectures",
            success:"deleted successfully",
            error:"failed to delete the lectures",
        });
        return(await response).data;

    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})
const lectureSlice=createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCourseLectures.fulfilled,(state,action)=>{
            console.log(action);
            state.lectures=action?.payload?.lectures;

        })
        .addCase(addCourseLectures.fulfilled,(state,action)=>{
            console.log(action);
            state.lectures=action?.payload?.course?.lectures;
        })
    }
});
export default lectureSlice.reducer;