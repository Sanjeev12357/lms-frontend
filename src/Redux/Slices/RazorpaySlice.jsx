import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosinstance";
import toast from "react-hot-toast";

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
export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data) => {
    try {
      const response = await axiosInstance.post("/payments/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
  
      toast.success(response.data.message); // Display a success toast
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message); // Display an error toast
      throw error; // Rethrow the error to indicate the failure of the thunk
    }
  });
  
  export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async (data) => {
    try {
      const response = await axiosInstance.post("/payments/unsubscribe");
  
      toast.success(response.data.message); // Display a success toast
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message); // Display an error toast
      throw error; // Rethrow the error to indicate the failure of the thunk
    }
  });
  



const razorpaySlice=createSlice({
    name:"razorpay",
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
        .addCase(getPaymentrecord.fulfilled,(state,action)=>{
            state.allPayment=action?.payload?.allPayment;
            state.finalMonths=action?.payload?.finalMonths;
            state.monthlySalesRecord=action?.payload?.monthlySalesRecord;

        })

    }
});

export default razorpaySlice.reducer;