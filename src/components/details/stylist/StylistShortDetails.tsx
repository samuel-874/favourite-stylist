import { Address, Distance, Like, Links, Mail, Mobile, SLocationIcon, Stars } from "../../../react-icons/Icons"
import { BoardCredentials, Bottom, Gallery, ProfilePic, ShortBed, StyledSection, StyledShort } from "./Stylist.styles"
import profile from "../../../assets/test-profile.svg";
import appLogo from "../../../assets/app_logo.png";
import { Img } from "../../form/signin/Signin.styles";
import { useEffect,useState } from "react";
import axios from "axios";
import { StylistDetails } from "../../../types/appTypes";
import { useNavigate } from "react-router-dom";
import { StylistSKeleton } from "../../../general/GeneralComponents";
import { formatMobile } from "../../../general/service";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { updateOrderInfo } from "../../../redux/slices/BookingSlice";


export const StylistShortDetails = ({stylistId,updateShow}:{stylistId?:number,updateShow:Function}) => {

  const base_url = process.env.REACT_APP_BURL;
  const file_url = process.env.REACT_APP_FURL;
  const token = localStorage.getItem("jwt");
  const [ stylist, setStylist ] = useState<StylistDetails>();
  const [ isLiked, updateLiked ] = useState(false);
  const dispatch = useAppDispatch();
  const bookingInfo = useAppSelector(state => state.orderInfo);
  const navigate = useNavigate();

  
  const handleLike = () => {
    updateLiked((oldVal)=>!oldVal);

    axios({
      method:"POST",
      url:`${base_url}/auth/users/like`,
      params:{id:stylistId},
      headers:{Authorization:`Bearer ${token}`},
    }).catch((error)=>{
      console.log(error);
      
    })
    
}


  useEffect(()=>{
    if(stylistId != undefined && stylistId > 0){
      axios({
        url:`${base_url}/auth/users/view-stylist`,
        params:{id:stylistId},
        headers:{Authorization:`Bearer ${token}`},
     }).then(response => {   
      const data = response.data?.data;
      
        setStylist(data);
        updateLiked(data?.liked)
     }).catch( error => {
       console.log(error);
    }) 
    }
  },[stylistId])

  const calcRating = ():JSX.Element[] => {
    let stars = [];
    const rating = stylist?.averageRating || 0
   
          for(let i = 1; i <= 5; i++){
      if(i <= rating){
        stars.push(<Stars key={i} />)
      }else{
        stars.push(<Stars key={i} isColored={false} />)
      }
    }



    return stars;
  }

  
  const handleBooking = () => {

    dispatch( updateOrderInfo({...bookingInfo,stylist:{
      id:stylistId,name:`${stylist?.firstname} ${stylist?.lastname}`,location:stylist?.location,mobile:stylist?.mobile
    }}))

      if(bookingInfo.service.id < 1){
          navigate("/bookings#service")
      }
    
  }


  

    return (
        <div>
       <ShortBed onClick={()=>updateShow({show:false,id:0})} />
       {
        stylist ?
      <StyledShort>
              <metadata> 
                <div>
                 <data>
                     <p>{`${stylist?.firstname } ${stylist?.lastname}`}</p>
                     <img alt="..." src={appLogo} />
                 </data>
                <div onClick={handleLike}><Like isLiked={isLiked} /></div> 
                </div>
                <span>
                 <span>
                   {calcRating()}
                 </span>
                 <h5>{`${stylist?.reviews.length} reviews`}</h5>
                </span>
               </metadata>
              <hr />
              <StyledSection>
                <img alt="..." src={`${file_url}?name=${stylist?.profilePic}`} />
                <p>{stylist?.bio}</p>
              </StyledSection>
              <BoardCredentials>
               <span><Distance  /><p >5 km from town centre </p></span> 
               <span><Address /><p>{stylist?.location}</p></span> 
               <span><Mobile /><p>{ formatMobile(stylist?.mobile)}</p></span> 
               <span><Mail /><p>{stylist?.email}</p></span> 
              {stylist?.certificate && <span><Links /><p>{stylist.certificateType}</p></span> }
              </BoardCredentials>
              { Array.isArray(stylist?.galleryImages) &&
              
              <Gallery>
                {stylist?.galleryImages?.length > 0 && 
                 <>
                <span>
                 <h3>Gallery</h3> <h4>{stylist?.galleryImages.length !== undefined && stylist?.galleryImages.length > 4 && `+${stylist?.galleryImages?.length - 4} more`}</h4>
                </span>
                <div>
                  {stylist?.galleryImages.map( (image,i)  =><img alt="..." key={i} src={`${file_url}?name=${image}`} />) }
                </div>
                 </> 
                }  
 
              </Gallery>
              }
              <Bottom>
                <p onClick={()=>navigate(`/stylists/${stylistId}`)}>View full profile</p>
                <button onClick={handleBooking}>Book</button>
              </Bottom>
        </StyledShort>
     :<StylistSKeleton />

       }
       
        </div>
    )
}