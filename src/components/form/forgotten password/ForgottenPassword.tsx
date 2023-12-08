import { FaceBookLogo, GoogleLogo, PasswordIcon } from "../../../react-icons/Icons";
import { Break, Footer, Img, Input, RightSection, StyledButton } from "../signin/Signin.styles";
import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { startLoading, stopLoading } from "../../../redux/slices/LoadingSlice";
import axios from "axios";
import { logUserIn, sendVerificationLinkToMail } from "../../../general/service";
import { setInfo } from "../../../redux/slices/InfoSlice";
import { wait } from "@testing-library/user-event/dist/utils";


export const ForgottenPassword = () => {
    
    const [ showPassword,setShowPassword ] = useState<Boolean>(false);
    // const [ isLoading,setIsLoading ] = useState<Boolean>(false);
    const loading = useAppSelector( state => state.loading.isLoading );
    const dispatch = useAppDispatch();
    const [ formError, setFormError ] = useState({
      emailError:'',
    })
    const [ formData, setFormData ] = useState({
      email:''
    })
    const { REACT_APP_BURL } = process.env;

    const updateForm = ( e:React.ChangeEvent<HTMLInputElement> ):void =>{
      setFormData(oldData => {
        return{
          ...oldData,
          [e.target.name]:e.target.value
        }
      })
    }

    const updateFormError = ( field:"emailError",message:string):void => {
        setFormError(oldErrors => {
            return {
              ...oldErrors,
              [field]:message
            }
        })
    }

    const anyError = ():boolean => {
        const { email } = formData;

        if(!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            setFormError({emailError:'*Please enter a valid email address'})
            return true
        }else{
            setFormError({emailError:''})
            return false;
        }
    }

    type Info = {
      icon?:string,
      heading:string,
      isError:boolean,
      message:string,
      buttonText:string,
      url:string
    }

    const setDispatch = (info:Info) => {
      dispatch(setInfo({
        icon:info?.icon,
        heading:info.heading,
        isError:info.isError,
        message:info.message,
        buttonText:info.buttonText,
        url:info.url
      }))
    }

     const submitForm = async ( e:React.FormEvent) =>  {
       e.preventDefault();
       const isError = anyError()
        if(!isError && !loading){
          dispatch(startLoading());
           sendVerificationLinkToMail(formData,setDispatch);          
        }
    }

    useEffect(()=>{
      if(loading){

        setTimeout(() => {
          dispatch(stopLoading());

        }, 10000);
      }
    },[loading])


    return (
        <RightSection>
          <p onClick={()=>setShowPassword(false)} >Forgot Password?</p>
          <h3>Enter the email address associated with your account and we will send you a link to reset your password.</h3>
          <form  onSubmit={submitForm}>
            <Input color={formError.emailError !== '' ? '#FF303C' :''} >
               Email Address
                 <span> <input name="email" value={formData.email} onChange={updateForm} placeholder="Your username" /></span>
               { formError.emailError && <p>{formError.emailError}</p>}
            </Input>
            <div>
              <StyledButton style={{marginTop:"42px",marginBottom:"12px"}} >Send Link</StyledButton>
                <div  style={{display:"flex",justifyContent:"space-around"}}>
                  <h4>Remember Password now ?<a href="/signin">Return to Sign In</a></h4>
                </div>
            </div>
          </form>
        </RightSection>
    )
}