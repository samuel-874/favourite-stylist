import { HeaderLeft, StyledApp } from "./AppTemplate.styles";
import logo from "../../assets/app_logo.png";
import { useEffect, useState } from "react";
import { Img } from "../form/signin/Signin.styles";
import { Bell } from "../../react-icons/Icons";
import {  ProfileView } from "../../general/GeneralComponents.styles";
import { A, Card, Footer, HambuggerMenu, InfoCard2, Loader, Menu } from "../../general/GeneralComponents";
import { MenuList } from "../../types/appTypes";
import { Outlet, useNavigate } from "react-router-dom";
import  axios  from "axios"
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { setUserInfo } from "../../redux/slices/UsersSlice";
import isJwtTokenExpired from 'jwt-check-expiry';
import { setInfo } from "../../redux/slices/InfoSlice";
import { stopLoading } from "../../redux/slices/LoadingSlice";


export const AppTemplate = () => {


    const [ isOpened, toggleOpen ] = useState(false);
    const base_url = process.env.REACT_APP_BURL;
    const token = localStorage.getItem("jwt");
    const [ userInfo, updateInfo ] = useState({
        firstname:"",
        lastname:""
    })
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector( state => state.loading)

    const menuList:MenuList[] = [
        {label:"Home",link:"/",key:1},
        {label:"Bookings",link:"/bookings",key:2},
        {label:"Studio",link:"/video-list",key:3},
    ]

    useEffect(()=>{
        
        if(!token){
            navigate("/signin")
        }else{

            if(isJwtTokenExpired(token)){
                dispatch(setInfo({
                    heading:"Session Expired",
                    isError:true,
                    message:"Please login to continue",
                    buttonText:"Login",
                    url:"/signin?session-exceeded"
                  }))
            }else{
                                
                axios({
                    url:`${base_url}/auth/users/details`,
                    headers:{Authorization:`Bearer ${token}`}
                }).then((response)=>{
                    const data = response.data.data;
                    updateInfo(data)
                    dispatch(setUserInfo(data))
                }).catch( error => {
                       console.log(error.message);
                    if(error.message === 'Network Error'){
                        dispatch(setInfo({
                          heading:"Network Error",
                          isError:true,
                          message:"Please ensure a stable connection and try again",
                          buttonText:"Refresh",
                          url:`refresh`
                        }))
                    }else if(error.response?.data?.error === "User was not found"){
                        localStorage.clear();
                        window.location.assign("/signin?error=true")
                    }
                       
                })
            }
   


        
        }
    },[])

    useEffect(()=>{
        if(loading.isLoading){
            setTimeout(()=>{
                dispatch(stopLoading())
            },4000)
        }
    },[loading])
    

    return (
        <>
        <StyledApp>
            <header>
               <span>
                  <Img width={"45px"} height={"55px"} src={logo} onClick={()=>window.location.assign("/")} />
               </span>
                <ul>
                    { menuList.map( item => <A key={item.key} prop={item} />)}
                </ul>
                <HeaderLeft>
                  <Bell />
                  <ProfileView onClick={()=>toggleOpen( val => !val)}>{`${userInfo?.firstname.charAt(0).toUpperCase()}${userInfo?.lastname.charAt(0).toUpperCase()}`}</ProfileView>
                </HeaderLeft>
                { isOpened &&  <Menu list={menuList} userInfo={userInfo}  />}
                <nav id="nav-sec">
                  <HambuggerMenu isOpened={isOpened} toggleOpen={toggleOpen}  />
                </nav>
            </header>
            <main>
              <Outlet />
            </main>
            { <InfoCard2 /> }
            { <Loader />}

        </StyledApp>
           <Footer />
           </>
    )
}