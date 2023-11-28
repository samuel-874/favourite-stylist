import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const Authenticator = () => {
    const { user,logout } = useAuth0();
    const navigate = useNavigate();

    const base_url = process.env.REACT_APP_BURL

    useEffect(()=>{        

        if(user != undefined){
           const email = user?.email;
           const lastname = user?.family_name;
           const firstname = user?.given_name;
           const mobile = user?.phone_number;   
           const sub = user?.sub
           const provider = sub?.includes("google") ? "google" : ( sub?.includes("facebook") ? "facebook" : "unknown")

            
           if(email || mobile){
                axios({
                    method:"POST",
                    url:`${base_url}/users/social-login`,
                    data:{
                        email,lastname,firstname,mobile,provider
                    }
                }).then( response => {
                  const token =   response.data?.jwt;
                  localStorage.setItem("jwt",token);
                  
                }).then(()=>{
                    logout({ logoutParams: { returnTo: window.location.origin } })
                }).catch( error => {
        
                })
           }else{
                navigate(`/signin?status=failed&message=email-or-mobile-not-returned`)
           }
             
        }

        setTimeout(() => {
            navigate(`/signin?status=failed&message=email-or-mobile-not-returned`);
        }, 15000);


    },[user])


    return (
        <div>You will be redirected shortly...</div>
    )
}