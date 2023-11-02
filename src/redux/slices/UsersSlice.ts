import { createSlice } from "@reduxjs/toolkit";

const UsersSlice = createSlice({
    name:"userInfo",
    initialState:{
        firstname:"",
        lastname:"",
        email:""
    },
    reducers:{
        setUserInfo:(state,action) =>{
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.email = action.payload.email;
        }
    }
})


export const { setUserInfo } = UsersSlice.actions;
export default UsersSlice.reducer;