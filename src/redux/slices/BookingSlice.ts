import { createSlice } from "@reduxjs/toolkit";
import { OrderRole } from "../../types/appTypes";

const BookingSlice = createSlice({
    name:`orderInfo`,
    initialState:{

        service:{
            id: 0,
            name:"",
            price:0,
            description:"",
            duration:"",
            image: ""
        },

        stylist:{
            id:0,
            name:"",
            location:"",
            mobile:"",
        },

        scheduledDate:"",
        userRole:OrderRole.CUSTOMER
        
    },reducers:{
        updateOrderInfo: (state,action) => {
            state.stylist  = action?.payload?.stylist
            state.service  = action?.payload?.service
            state.userRole = action?.payload?.userRole
            state.scheduledDate = action?.payload?.scheduledDate
        },
        clearOrderInfo: ( state ) => {
            state.scheduledDate= ""
            state.userRole = OrderRole.CUSTOMER
            state.stylist = { id:0, name:"", location:"",mobile:""}
            state.service = {  id: 0, name:"",price:0,description:"",duration:"",image: "" }
        }
    }
})

export const {  updateOrderInfo, clearOrderInfo } = BookingSlice.actions;
export default BookingSlice.reducer;
export type BookingSliceType  = typeof  BookingSlice;