import { FaceBookLogo, GoogleLogo, PasswordIcon } from "../../../react-icons/Icons";
import { Break, Footer, Img, Input, RightSection, StyledButton } from "../signin/Signin.styles";
import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { startLoading, stopLoading } from "../../../redux/slices/LoadingSlice";
import axios from "axios";
import { logUserIn, resetPassword } from "../../../general/service";
import { setInfo } from "../../../redux/slices/InfoSlice";
import { useParams } from "react-router-dom";

export const ResetPassword = () => {

    const params = useParams();
    const encodedValue = params.token
    if(!encodedValue){
        window.location.assign("404?error=invalid-access")
    }

    const token = window.atob(encodedValue||"")

    const otp = token?.substring(64,70);
    const email = token?.substring(70);

    
    const [ showPassword,setShowPassword ] = useState<Boolean>(false);
    const [ showConfirmPassword,setShowConfirmPassword ] = useState<Boolean>(false);
    // const [ isLoading,setIsLoading ] = useState<Boolean>(false);
    const loading = useAppSelector( state => state.loading.isLoading );
    const dispatch = useAppDispatch();
    const [ formError, setFormError ] = useState({
        passwordError:'',
        confirmPasswordError:'',
    })
    const [ formData, setFormData ] = useState({
      password:'',
      confirmPassword:''
    })


    const updateForm = ( e:React.ChangeEvent<HTMLInputElement> ):void =>{
      setFormData(oldData => {
        return{
          ...oldData,
          [e.target.name]:e.target.value
        }
      })
    }

    const updateFormError = ( field:"passwordError"|"confirmPasswordError",message:string):void => {
        setFormError(oldErrors => {
            return {
              ...oldErrors,
              [field]:message
            }
        })
    }

    const anyError = ():boolean => {
        const { confirmPassword, password } = formData;

        const error = { passwordError:'', confirmPasswordError:'' }

        if(password.length < 8){
          error.passwordError ="*Please enter a password of atleast 8 characters with an uppercase, lowercase, numeric or special character. ";
        }else{
            error.passwordError ="";
        }

        if(confirmPassword !== password){
            error.confirmPasswordError = "*Your passwords do not match. Please try again"
        }else{
            error.confirmPasswordError = ""
        }

        if(error.confirmPasswordError === '' && error.passwordError === '' ){
           return false;
        }

        setFormError(error);

        return true;
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

       const isError = anyError();

       const data = {
        email:email||"",
        otp:otp||"",
        password:formData.password||""
       }

        if( !isError) {
          dispatch(startLoading());
          
          resetPassword(data,setDispatch);  
        }
    }

    useEffect(()=>{
      if(loading){
        setTimeout(() => {
          dispatch(stopLoading());

        }, 5000);
      }
    },[loading])

    
    return (
        <RightSection>
        <p onClick={()=>setShowPassword(false)} >Reset Your Password</p>
        <h3>Create a new password for your account.</h3>
          <form  onSubmit={submitForm}>
            <Input color={formError.passwordError !== '' ? '#FF303C' :''} >
              Password
               <span>
                 <input name="password" value={formData.password} onChange={updateForm} type={showPassword ? "text" : "password"}  placeholder="Enter strong password" />
                 <PasswordIcon  show={showPassword} setShow={()=>setShowPassword( show => !show)}  />
               </span>
               { formError.passwordError && <p>{formError.passwordError}</p>}
            </Input>
            <Input color={formError.confirmPasswordError !== '' ? '#FF303C' :''} >
              Confirm Password
              <span>
                <input name="confirmPassword" value={formData.confirmPassword} onChange={updateForm} type={showConfirmPassword ? "text" : "password"} placeholder="Enter strong password" />  
                <PasswordIcon  show={showConfirmPassword} setShow={()=>setShowConfirmPassword( show => !show)}  />
              </span>
                { formError.confirmPasswordError && <p>{formError.confirmPasswordError}</p>}
            </Input>
            <div>
              <StyledButton >Reset Password</StyledButton>
              <div  style={{display:"flex",justifyContent:"space-around"}}>
                <h4>Remember Password now? <a href="/signin">Return to Sign In</a></h4>
                 
              </div>
            </div>
          </form>
          <Break>
            <span></span>
            <p>OR</p>
            <span></span>
          </Break>
          <Footer >
            <div style={{border:'1px solid gray'}}>
              <GoogleLogo />
              <p>Sign In with Google</p>
            </div>  
            <div style={{backgroundColor:'#0077B7',color:'white'}}>
              <FaceBookLogo />
              <p>Sign In with Facebook</p>
            </div>
          </Footer>
      </RightSection>
    )
}