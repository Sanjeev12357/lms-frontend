import { createSlice } from "@reduxjs/toolkit";

const intitialState={
    isLoggedIn:localStorage.getItem('isLoggedIn')||false,
    role:localStorage.getItem('role')||"",
    data:localStorage.getItem('data')||{}
};

const authSlice=createSlice({
    name:'auth',
    intitialState,
    reducer:{},
});

// export const {}=authSlice.actions;
export default authSlice.reducer;