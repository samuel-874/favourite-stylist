import {  useEffect, useState } from "react";
import { Badge, CardIcon, Like,  SLocationIcon, Stars, TelSVG } from "../../react-icons/Icons";
import axios from "axios";
import logo from "../../assets/app_logo.png"
import {  StylistCredentials, } from "../../types/appTypes";
import { capitalize, formatMobile } from "../../general/service";
import { useContext } from "react";
import { Img } from "../form/signin/Signin.styles";
import { StylistCardStyled } from "./StylistCard.styles";
import { StylisContext } from "styled-components/dist/models/StyleSheetManager";
import { StylistContext } from "../home/Home";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { updateOrderInfo } from "../../redux/slices/BookingSlice";
import { useNavigate } from "react-router-dom";



export const StylistCard = ({props,layout="grid",isSelected}:{props:StylistCredentials,layout?:string,isSelected?:boolean}) =>  {
    const base_url = process.env.REACT_APP_BURL
    const token = localStorage.getItem("jwt");
    const file_url = process.env.REACT_APP_FURL;
    const stagedStylist = useContext(StylistContext);
    const navigate = useNavigate();
    const bookingInfo = useAppSelector( state => state.orderInfo );
    const dispatch = useAppDispatch();

    
    
    const {profilePic,firstname,lastname,distance=10,location,mobile,averageRatings =0,isCertified,isLiked,id} = props;
    const [ liked, updateLiked ] = useState(isLiked);
      const calcRating = ():JSX.Element[] => {
        let stars = [];
        for(let i = 1; i <= 5; i++){
          if(i <= averageRatings){
            stars.push(<Stars key={i} />)
          }else{
            stars.push(<Stars key={i} isColored={false} />)
          }
        }
  
        return stars;
      }

      const handleLike = () => {
            updateLiked((oldVal)=>!oldVal);

            axios({
              method:"POST",
              url:`${base_url}/auth/users/like`,
              params:{id:id},
              headers:{Authorization:`Bearer ${token}`},
            }).catch((error)=>{
              console.log(error);
              
            })
            
      }

      const handleBooking = () => {

        dispatch( updateOrderInfo({...bookingInfo,stylist:{
          id:id,name:`${firstname} ${lastname}`,location:location,mobile:mobile
        }}))

          if(bookingInfo.service.id < 1){
              navigate("/bookings#service")
          }
        
      }


     
      
    return (
      <StylistCardStyled  style={{display:"flex",justifyContent:"space-between",flexDirection: layout === "grid" ? "column" : "row" ,border: isSelected ? "1px solid":"none"}}>
        <div>
        <div>
          <Img style={{border:"2px solid #590BA9",borderRadius:"99px"}} width={"40px"} height={"40px"} src={`${file_url}?name=${profilePic}`} />
          <span onClick={()=>{
              stagedStylist !== undefined && stagedStylist.setStagedStylist({id:id,show:true});
            }}>
            <h1>{`${firstname} ${lastname}`}</h1>
            <p>{`${distance}km from town center`}</p>
          </span>
         { layout !== "list" && <Img width={"18px"} height={"25px"} src={logo} />}
        </div>
        <div>
          <SLocationIcon />
          <span style={{fontWeight:"600"}}>
            {location}
          </span>
        </div>
        <div>
          <TelSVG />
          <span style={{fontWeight:"600"}}>{ formatMobile(mobile)}</span>
        </div>
        </div>
        <div style={{display:"flex",flexDirection: layout=== "grid" ? "column" :"column-reverse",justifyContent:"space-between"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <span style={{whiteSpace:"nowrap"}}>{ calcRating()} </span>
                { layout === "list" && <Img width={"18px"} style={{marginLeft:"7px"}} height={"25px"} src={logo} />     }
            <span style={{display:"flex",justifyContent:"end",whiteSpace:"nowrap"}}>{ isCertified && <data style={{fontSize:"15px",fontFamily:"Mohave"||"Franklin Gothic Medium",fontWeight:"600",color:"#A7A5A5",marginLeft:"7px"}}><Badge /> CERTIFIED </data>}</span>
          </div>
          <div style={{alignItems:"center",flexDirection: layout=== "grid" ? "row" :"row-reverse",justifyContent: layout=== "grid" ? "space-between" :"space-around"}}>
            <button onClick={handleBooking} >Book</button>
            <data onClick={handleLike} style={{margin: layout=== "grid" ? "0" : "0 10px" }}><Like isLiked={liked} /></data>
          </div>
        </div>
      </StylistCardStyled>
    )
  }