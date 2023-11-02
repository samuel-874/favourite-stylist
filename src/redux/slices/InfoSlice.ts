import { createSlice } from "@reduxjs/toolkit";

 const InfoSplice = createSlice({
   name:'info',
   initialState:{
    icon:'',
    showInfo:false,
    heading:'Welcome Back!',
    message:'You have successfully signed in.',
    isError:false,
    buttonText:'Continue with your experience',
    buttonText2:"",
    middleSec:false,
    meetLink:"",
    instruction:"",
    url:``
   },
   reducers:{
        setInfo: (state,action)=>{
            state.showInfo = true
            state.icon = action.payload?.icon;
            state.heading = action.payload?.heading;
            state.isError = action.payload?.isError;
            state.message = action.payload?.message;
            state.buttonText = action.payload?.buttonText;
            state.url = action.payload?.url;

            state.buttonText2 = action.payload?.buttonText2;
            state.middleSec = action.payload?.middleSec;
            state.meetLink = action.payload?.meetLink;
            state.instruction = action.payload?.instruction;

        }
        ,
        closeInfo : ( state ) => {
            state.showInfo=false;
            state.icon='';
            state.heading='Welcome Back!';
            state.message='You have successfully signed in.';
            state.isError=false;
            state.buttonText='Continue with your experience';

            state.buttonText2 = "";
            state.middleSec = false;
            state.meetLink = "";
            state.instruction = "";
        }

   }
})

 export const { setInfo, closeInfo } = InfoSplice.actions;
 export default InfoSplice.reducer;
 
