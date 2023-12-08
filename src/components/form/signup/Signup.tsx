import React, { useEffect } from 'react';
import { FaceBookLogo, GoogleLogo, PasswordIcon } from "../../../react-icons/Icons";
import { Break, CheckBox, Footer, Img, Input, RightSection, StyledButton } from "../signin/Signin.styles";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';
import { startLoading, stopLoading } from '../../../redux/slices/LoadingSlice';
import { setInfo } from '../../../redux/slices/InfoSlice';
import { registerUser } from '../../../general/service';


export const SignUp = () => {
    
    const [ showPassword,setShowPassword ] = useState<Boolean>(false);
    const isLoading = useAppSelector( state => state.loading.isLoading);
    const { REACT_BURL } = process.env;
    const dispatch = useAppDispatch();
    const [ theresError, setError ] = useState<Boolean>(true)
    const [ formError, setFormError ] = useState({
      fullnameError:'',
      emailError:'',
      passwordError:'',
      confirmPasswordError:'',
    })

    const [ formData, setFormData ] = useState({
      fullname:'',
      email:'',
      password:'',
      confirmPassword:'',
    })

    

    const updateForm = ( e:React.ChangeEvent<HTMLInputElement> ):void =>{
      setFormData(oldData => {
        return{
          ...oldData,
          [e.target.name]:e.target.value
        }
      })
    }

    const updateFormError = ( field:"fullnameError"|"passwordError"|"confirmPasswordError"|"emailError",message:string):void =>{
      setFormError(oldErrors => {
          return {
            ...oldErrors,
            [field]:message
           }
      })
    }

    const anyError = ():boolean =>{
        const { fullname, email, password, confirmPassword} = formData;

        const firstname = fullname.split(" ")[0]
        const lastname = fullname.split(" ")[1]

        const errors = {
            fullnameError:'',
            emailError:'',
            passwordError:'',
            confirmPasswordError:'',
        }

        if(!firstname || !lastname  ){
            errors.fullnameError = '*Please enter your name'
        }else{
            errors.fullnameError = '';
        }

        if(!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            errors.emailError = '*Please enter a valid email address'
        }else{
            errors.emailError = ''
        }
        if(password.length < 8){
            errors.passwordError = '*Please enter a password of atleast 8 characters with an uppercase, lowercase, numeric or special character. '
        }else{
            errors.passwordError = ''
        }
        
        if(confirmPassword !== password){
            errors.confirmPasswordError = '*Your passwords do not match. Please try again'
        }else{
            errors.confirmPasswordError = ''
        }

        setFormError({...errors})

        if(Object.values(formData).every( data => data !== '') && Object.values(errors).every( error => error === '' )){
           return false;
        }

        return true
    }

    type Info = {
      heading:string,
      isError:boolean,
      message:string,
      buttonText:string,
      url:string
    }

    const updateInfo = (info:Info) => {
      dispatch(setInfo({
        heading:info.heading,
        isError:info.isError,
        message:info.message,
        buttonText:info.buttonText,
        url:info.url
      }))
    }

    const submitForm = ( e:React.FormEvent):void => {
       e.preventDefault();
       const { fullname, email, password } = formData;

       const isError = anyError();
       const userData = {
        "firstname":fullname.split(" ")[0],
        "lastname":fullname.split(" ")[1],
        "email":email?.toLowerCase()?.trim(),
        password:password,
       }

        if(!isError && !isLoading){

          dispatch(startLoading());

          registerUser(userData,updateInfo);
          dispatch(stopLoading());

        }
    }

    useEffect(()=>{
      const { fullname, email, password, confirmPassword } = formData;
      const isError = fullname.length < 1 || email.length < 5 || password.length < 8 || confirmPassword !== password;
      console.log(isError);
      
      setError(isError)

    },[formData])

    useEffect(()=>{
      if(isLoading){

        setTimeout(() => {
          dispatch(stopLoading());

        }, 10000);
      }
    },[isLoading])

    return (
          <RightSection  style={{marginTop:"dvh",paddingBottom:"8vh"}}>
            <p onClick={()=>setShowPassword(false)} >Join curly sister </p>
                <h3>Get access to pro videos, articles, free awesome material & your questions answered on the Curly Sister community.</h3>
             <form onSubmit={submitForm}>
              <Input color={formError.fullnameError !== '' ? '#FF303C' :''} >
                 Full Name
                <span> <input name="fullname" value={formData.fullname} onChange={updateForm} placeholder="Enter Full Name" /></span>
                { formError.fullnameError && <p>{formError.fullnameError}</p>}
              </Input>
              <Input color={formError.fullnameError !== '' ? '#FF303C' :''} >
                   Email Address
                   <span> <input name="email" type="email" value={formData.email} onChange={updateForm} placeholder="Enter email address" /></span>
                  { formError.emailError && <p>{formError.emailError}</p>}
               </Input>
              <Input color={formError.passwordError !== '' ? '#FF303C' :''} >
                Password
                <span>
                  <input name="password" value={formData.password} onChange={updateForm} type={showPassword ? "text" : "password"} placeholder="Enter strong password" />
                  <PasswordIcon  show={showPassword} setShow={()=>setShowPassword( show => !show)}  />
                </span>
                  { formError.passwordError && <p>{formError.passwordError}</p>}
               </Input>           
       
              <Input color={formError.confirmPasswordError !== '' ? '#FF303C' :''} >
              Confirm Password
                <span>
                  <input name="confirmPassword" value={formData.confirmPassword} onChange={updateForm} type={showPassword ? "text" : "password"} placeholder="Re-enter your password" />
                  <PasswordIcon  show={showPassword} setShow={()=>setShowPassword( show => !show)}  />
                </span>
                  { formError.confirmPasswordError && <p>{formError.confirmPasswordError}</p>}
               </Input>
                 <CheckBox>
                   <input type='checkbox' /> <div>By ticking this checkbox, you agree to being added to our mailing list</div>
                 </CheckBox>
                
                <div>
                 <StyledButton style={{opacity: theresError ? "0.5" : "1"}} >Continue</StyledButton>
                </div>
                <div style={{display:"flex",justifyContent:"space-around"}}>
                 <h4>Already have an account? <a href="/signin">Sign in</a></h4>
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
                <h4>By creating an account, you agree to Curly Sister’s <a href="">Terms of Use</a> and <a href="">Privacy Policy.</a></h4>
          </RightSection>
    );
};


