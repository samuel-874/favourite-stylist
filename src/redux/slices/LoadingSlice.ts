import { createSlice } from "@reduxjs/toolkit";

const LoadingSlice = createSlice({
    name:"loading",
    initialState:{
        isLoading:false,
    },
    reducers:{
        startLoading : (state) =>{
            state.isLoading = true;
        },
        stopLoading : (state) =>{
            state.isLoading = false;
        }
    }
})

export const { startLoading, stopLoading } = LoadingSlice.actions;
export default LoadingSlice.reducer;