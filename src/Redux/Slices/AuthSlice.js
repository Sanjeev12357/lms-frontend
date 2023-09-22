import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance"

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}
};

export const createAccount=createAsyncThunk("/auth/signup",async(data)=>{
    try{
        const res=axiosInstance.post("/user/register",data);
        toast.promise(res,{
            loading:"wait ! creating your account",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"failed to create account"
        });

        console.log(res);
        return (await res).data;

    }catch(error){
        toast.error(error?.response?.data?.message);

    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState, // Corrected spelling here
    reducers: {},
});

export default authSlice.reducer;
