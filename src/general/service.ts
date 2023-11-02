import axios from "axios";
import { FormDataType } from "../types/appTypes";


const { REACT_APP_BURL } = process.env

export function formatCompactNumber(number:number) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
}

export const capitalize = (word:string) =>{
  
  const firstLetter = word.charAt(0)
  const firstLetterCap = firstLetter.toUpperCase()
  const remainingLetters = word.slice(1)
  const capitalizedWord = firstLetterCap + remainingLetters

    return capitalizedWord
}


export const registerUser = async (data:FormDataType,func:Function) => {
    
    axios({
        url:`${REACT_APP_BURL}/users/register`,
        method:"POST",
        data:data
      }).then( () => {
         func({
           heading:"Welcome to the Community",
           isError:false,
           message:"You have successfully subscribed to Curly Sister.",
           buttonText:"Continue with your experience",
           url:`/signin`
          })
      }).catch( error => {
        console.log(error);
                
        if(error.response){
          if(error.response.data){
           if(error.response.data.message){
             func({
               heading:"Oops! Something went wrong",
               isError:true,
               message:error.response.data.message,
               buttonText:"Try Subscribing Again",
               url:`close_page`
             })
           }else{
             func({
               heading:"Oops! Something went wrong",
               isError:true,
               message:'An Error occurred on the server',
               buttonText:"Try Subscribing Again",
               url:`close_page`
             })
           }
          }
       }else{
         func({
           heading:"Unable to Connect",
           isError:true,
           message:'Please ensure that your connection is Stable',
           buttonText:"Try Subscribing Again",
           url:`close_page`
         })
       }
      
        
      })
      
} 

export const logUserIn = async ( data:{username:string,password:string},func:Function ) => {
 
  axios({
      url:`${REACT_APP_BURL}/users/login`,
      method:"POST",
      data:data
    }).then( response => {
       window.localStorage.setItem("jwt",response.data.jwt);
       window.location.assign("/")
    }).catch( error => {
      console.log(error);

      
      if(error.response){
         if(error.response.data){
          if(error.response.data.message){
            func({
              heading:"Oops! Something went wrong",
              isError:true,
              message:error.response.data.message,
              buttonText:"Try Again",
              url:`close_page`
            })
          }else{
            func({
              heading:"Oops! Something went wrong",
              isError:true,
              message:'An Error occurred on the server',
              buttonText:"Try Again",
              url:`close_page`
            })
          }
         }
      }else{
        func({
          heading:"Unable to Connect",
          isError:true,
          message:'Please ensure that your connection is Stable',
          buttonText:"Try Again",
          url:`close_page`
        })
      }
    })
}
export const sendVerificationLinkToMail = async ( data:{email:string},func:Function ) => {
 
  axios({
      url:`${REACT_APP_BURL}/users/send-link`,
      method:"POST",
      data:data
    }).then( () => {
      func({
        icon:'message',
        heading:"Reset link sent",
        isError:false,
        message:"A reset link has been sent to the email address",
        buttonText:"Continue",
        url:`/`
      })
    }).catch( error => {
      console.log(error);

      
      if(error.response){
         if(error.response.data){
          if(error.response.data.message){
            func({
              icon:"check",
              heading:"Oops! Something went wrong",
              isError:true,
              message:error.response.data.message,
              buttonText:"Try Again",
              url:`close_page`
            })
          }else{
            func({
              icon:"check",
              heading:"Oops! Something went wrong",
              isError:true,
              message:'An Error occurred on the server',
              buttonText:"Try Again",
              url:`close_page`
            })
          }
         }
      }else{
        func({
          icon:"check",
          heading:"Unable to Connect",
          isError:true,
          message:'Please ensure that your connection is Stable',
          buttonText:"Try Again",
          url:`close_page`
        })
      }
    })
}

export const resetPassword = async ( data:{email:string,password:string,otp:string},func:Function ) => {
 
  axios({
      url:`${REACT_APP_BURL}/users/validate-link`,
      method:"POST",
      data:data
    }).then( () => {
      func({
        icon:'check',
        heading:"Password Reset Successful",
        isError:false,
        message:"Your password has been sucessfully updated",
        buttonText:"Continue",
        url:`/signin`
      })
    }).catch( error => {
      console.log(error);

      
      if(error.response){
         if(error.response.data){
          if(error.response.data.message){
            func({
              icon:"check",
              heading:"Password Reset Failed",
              isError:true,
              message:error.response.data.message,
              buttonText:"Try Again",
              url:`close_page`
            })
          }else{
            func({
              icon:"check",
              heading:"Password Reset Failed",
              isError:true,
              message:'An Error occurred on the server',
              buttonText:"Try Again",
              url:`close_page`
            })
          }
         }
      }else{
        func({
          icon:"check",
          heading:"Password Reset Failed",
          isError:true,
          message:'Please try again, we could not change your password',
          buttonText:"Try Again",
          url:`close_page`
        })
      }
    })
}


export const formatEnum = (text:String) => {
  text = text.toLowerCase().replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return text;
}

export const getName = (word:string) => {
  const wordArray = word.split(" ");
  const firstLetter = wordArray[0].charAt(0).toUpperCase();
  const lastLetter =  wordArray[1].charAt(0).toUpperCase();
  return `${firstLetter}${lastLetter}`;
} 

export const addNotes = (id="",note="") => {
  const { REACT_APP_BURL:base_url,REACT_APP_FURL:file_url} = process.env;
  const token = localStorage.getItem("jwt");

  if(id?.trim()?.length > 0 && note?.trim()?.length>0){
      axios({
        url:`${base_url}/auth/users/add-note`,
        method:"POST",
        headers:{Authorization:`Bearer ${token}`},
        data:{orderId:id,note:note}
      }).then( response => {
        console.log(response);
        alert("Note added successfully")

        
      }).catch( error => {
        
      })
  }


} 

export const formatMobile = (mobile:string) => {
    if(mobile?.length > 0){
        const countryCode  = mobile.slice(0,3);
        const secondSec = mobile.slice(3,6);
        const thirdSec  = mobile.slice(6,10);
        const lastSec = mobile.slice(10);

        return `(${countryCode}) ${secondSec}-${thirdSec}-${lastSec}`
    }

    return mobile;
}




