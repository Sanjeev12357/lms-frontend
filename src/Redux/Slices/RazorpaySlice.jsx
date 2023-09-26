import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosinstance";

const initialState={
    key:"",
    subscription_id:"",
    isPaymentVerified:false,
    allPayment:[],
    finalMonths:[],
    monthlySalesRecord:[]

}

export const getRazorPayId=createAsyncThunk("/razorpay/getId",async()=>{
    try{
        const response=await axiosInstance.get("/payments/razorpay-key");
        return response.data;

    }catch(error){
        toast.error("failed to load data");
    }
})

export const purchaseCourseBundle=createAsyncThunk("/purchaseCourse",async()=>{
    try{
        const response=await axiosInstance.get("/payments/subscribe");
        return response.data;

    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})

export const verifyUserPayment=createAsyncThunk("/payments/verify",async(data)=>{
    try{
        const response=await axiosInstance.post("/payments/verify",{
            razorpay_payment_id:data.razorpay_payment_id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature,
        });
        return response.data;

    }catch(error){
        toast.error(error?.message?.data?.message);
    }

});

export const getPaymentrecord=createAsyncThunk("/payments/record",async(data)=>{
    try{
        const response= axiosInstance.get("/payments?count=100");
        toast.promise({
            loading:"getting the payment records",
            success:(data)=>{
                return data?.data?.message
            },
            error:"failed to get payment records"

        }
        )
        return (await response).data;

    }catch(error){
        toast.error("operation failed");
    }

});
export const cancelCourseBundle=createAsyncThunk("/payments/cancel",async(data)=>{
    try{
       const response=axiosInstance.post("/payments/unsubscribe");
       toast.promise(response,{
        loading:"unsubscribing the bundle",
        success:(data)=>{
            return data?.data?.message
        },
        error:"failed to unsubscribe"
       })
        return (await response).data

    }catch(error){
        toast.error(error?.message?.data?.message);
    }

});




const razorpaySlice=createSlice({
    naem:"razorpay",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getRazorPayId.fulfilled,(state,action)=>{
          state.key=action?.payload?.key;  
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
            state.subscription_id=action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified=action?.payload?.success;
        })
        .addCase(getPaymentRecord.fulfilled,(state,action)=>{
            state.allPayment=action?.payload?.allPayment;
            state.finalMonths=action?.payload?.finalMonths;
            state.monthlySalesRecord=action?.payload?.monthlySalesRecord;
            
        })

    }
});

export default razorpaySlice.reducer;