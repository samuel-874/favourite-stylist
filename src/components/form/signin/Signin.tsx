import { FaceBookLogo, GoogleLogo, PasswordIcon } from "../../../react-icons/Icons";
import { Break, Footer, Img, Input, RightSection, StyledButton } from "./Signin.styles";
import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { startLoading, stopLoading } from "../../../redux/slices/LoadingSlice";
import { logUserIn } from "../../../general/service";
import { setInfo } from "../../../redux/slices/InfoSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import type { RedirectLoginOptions } from '@auth0/auth0-react';




export const Signin = () => {

    const [ showPassword,setShowPassword ] = useState<Boolean>(false);
    const navigate = useNavigate();
    const loading = useAppSelector( state => state.loading.isLoading );
    const dispatch = useAppDispatch();
    const param = useParams();
    const [ formError, setFormError ] = useState({
      usernameError:'',
      passwordError:''
    })
    const [ formData, setFormData ] = useState({
      username:'',
      password:''
    })
    const { REACT_APP_BURL } = process.env;
    const { loginWithRedirect,loginWithPopup } = useAuth0();

    const updateForm = ( e:React.ChangeEvent<HTMLInputElement> ):void =>{
      setFormData(oldData => {
        return{
          ...oldData,
          [e.target.name]:e.target.value
        }
      })
    }

    const updateFormError = ( field:"usernameError"|"passwordError",message:string):void => {
        setFormError(oldErrors => {
            return {
              ...oldErrors,
              [field]:message
            }
        })
    }
    

    const handleGoogleLogin = () => {
      loginWithRedirect(
        {
        authorizationParams: {
           connection: 'google-oauth2'
        }
      }
      );
    }
  
    const handleFacebookLogin = () => {
      loginWithRedirect(
        {
        authorizationParams: {
           connection: 'facebook'
        }
      }
      );
    }
  

    const anyError = ():boolean => {
        const { username, password } = formData;

        if(username.length < 1){
          updateFormError("usernameError","*Please enter your name")
        }else{
          updateFormError("usernameError",'')
        }

        if(password.length < 6){
          updateFormError("passwordError","*Please enter your password")
        }else{
          updateFormError("passwordError",'')
        }

        if(username.length > 1 && password.length > 5){
           return false;
        }

        return true;
    }

    type Info = {
      heading:string,
      isError:boolean,
      message:string,
      buttonText:string,
      url:string
    }

    const setDispatch = (info:Info) => {
      dispatch(setInfo({
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

       
         logUserIn(formData,setDispatch);          
        }
    }



    useEffect(()=>{
      const searchParams = new URLSearchParams(window.location.search)
      const search = searchParams.get("logout");

      const status = searchParams.get("status");

      if(status === "successful"){
          setDispatch({heading:"Account activated",isError:false,message:"Your account has successfuly been activateed login to continue",buttonText:"continue",url:"close_page"})
      }

      if(search){
        window.localStorage.clear()
      }
    },[])

    useEffect(()=>{
      if(loading){

        setTimeout(() => {
          dispatch(stopLoading());

        }, 5000);
      }
    },[loading])

    

    return (
          <RightSection>
            <p onClick={()=>setShowPassword(false)} >Sign in to continue to your account to continue with your experience.</p>
              <form  onSubmit={submitForm}>
                <Input color={formError.usernameError !== '' ? '#FF303C' :''} >
                  Username
                   <span> <input name="username" value={formData.username} onChange={updateForm} placeholder="Your username" /></span>
                   { formError.usernameError && <p>{formError.usernameError}</p>}
                </Input>
                <Input color={formError.passwordError !== '' ? '#FF303C' :''} >
                  Password
                  <span>
                    <input name="password" value={formData.password} onChange={updateForm} type={showPassword ? "text" : "password"} placeholder="Enter strong password" />
                    <PasswordIcon  show={showPassword} setShow={()=>setShowPassword( show => !show)}  />
                  </span>
                    { formError.passwordError && <p>{formError.passwordError}</p>}
                </Input>
                  <a href="/forgotten-password">Forgot password?</a>
                <div>
                  <StyledButton >Sign In</StyledButton>
                  <div  style={{display:"flex",justifyContent:"space-around"}}>
                    <h4>Don’t have an account? <a href="/signup">Sign Up</a></h4>
                  </div>
                </div>
              </form>
              <Break>
                <span></span>
                <p>OR</p>
                <span></span>
              </Break>
              <Footer >
                <div onClick={handleGoogleLogin}  style={{border:'1px solid gray'}}>
                  <GoogleLogo />
                  <p >Sign In with Google</p>
                </div>  
                <div onClick={handleFacebookLogin}  style={{backgroundColor:'#0077B7',color:'white'}}>
                  
                  <FaceBookLogo />
                  <p>Sign In with Facebook</p>
                </div>
              </Footer>
          </RightSection>
    );
};


