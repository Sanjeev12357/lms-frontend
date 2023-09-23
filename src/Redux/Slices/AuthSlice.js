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
});

export const Login=createAsyncThunk("/auth/login",async(data)=>{
    try{
        const res=axiosInstance.post("/user/login",data);
        toast.promise(res,{
            loading:"wait ! authentication in progress",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"failed to login"
        });

        console.log(res);
        return (await res).data;

    }catch(error){
        toast.error(error?.response?.data?.message);

    }
})

export const logout=createAsyncThunk("/auth/logout",async()=>{
    try{
        const res=axiosInstance.post("/user/logout");
        toast.promise(res,{
            loading:"wait ! logout progress",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"failed to logout"
        });

        console.log(res);
        return (await res).data;

    }catch(error){

    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState, // Corrected spelling here
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(Login.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.user?.role);
            state.isLoggedIn=true;
            state.data=action?.payload?.user;
            state.role=action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.data={};
            state.isLoggedIn=false;
            state.role="";
        })
    }
});

export default authSlice.reducer;
