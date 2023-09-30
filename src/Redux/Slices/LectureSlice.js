import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance";
const initialState={
    lectures:[]
}

export const getCourseLectures = createAsyncThunk(
    'course/getLectures',
    async (cid, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/courses/${cid}`);
        console.log(response.data); // Log the data you received
        return response.data;
      } catch (error) {
        // Use rejectWithValue to send the error message along with the action
        return rejectWithValue('Failed to load the lectures');
      }
    }
  );

  export const addCourseLectures = createAsyncThunk(
    'course/addLectures',
    async (data, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description);
  
        const response = await axiosInstance.post(`/courses/${data.id}`, formData);
        console.log(response);
        console.log(response.data); // Log the data you received
        return response.data;
      } catch (error) {
        // Use rejectWithValue to send the error message along with the action
        return rejectWithValue(error?.response?.data?.message || 'Failed to add the lectures');
      }
    }
  );

  export const deleteCourseLecture=createAsyncThunk("/course/lecture/delete",async(data)=>{
    try{
        const response = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response,{
            loading:"deleting course lecture",
            success:"lecture deleted successfully",
            error:"failed to delete the lectures"
        });
        return (await response).data;

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
  })
  
  
  
  
  
  
  const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCourseLectures.fulfilled, (state, action) => {
          state.lectures = action?.payload?.lectures;
        })
        .addCase(addCourseLectures.pending, (state) => {
          state.loading = 'pending';
        })
        .addCase(addCourseLectures.fulfilled, (state, action) => {
          state.loading = 'succeeded';
          // Update state as needed
        })
        .addCase(addCourseLectures.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.payload; // Handle the error message here
        })
        .addCase(deleteCourseLecture.pending, (state) => {
          state.loading = 'pending';
        })
        .addCase(deleteCourseLecture.fulfilled, (state, action) => {
          state.loading = 'succeeded';
          // Update state as needed after successful deletion
        })
        .addCase(deleteCourseLecture.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.payload; // Handle the error message here
        });
    },
  });
  
  export default lectureSlice.reducer;
  