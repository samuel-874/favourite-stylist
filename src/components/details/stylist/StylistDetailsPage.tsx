import { Address, Badge, Distance, Like, Links, Mail, Mobile, SLocationIcon, Stars } from "../../../react-icons/Icons"
import { BoardCredentials, Bottom, ColumnContainer, Gallery, MainGallery, ProfilePic, Review, ReviewSection, ShortBed, StyledSection, StyledShort, StylistPic, TopBoard, TopSect } from "./Stylist.styles"
import profile from "../../../assets/test-profile.svg";
import appLogo from "../../../assets/app_logo.png";
import { Img } from "../../form/signin/Signin.styles";
import { useEffect,useState } from "react";
import axios from "axios";
import facebook from "../../../assets/facebook.svg";
import instagram from "../../../assets/instagram.svg";
import mail from "../../../assets/mail.svg";
import { StylistDetails } from "../../../types/appTypes";
import { useNavigate, useParams } from "react-router-dom";
import { formatCompactNumber, formatEnum, getName } from "../../../general/service";


export const StylistDetailsPage = () => {

   const params = useParams();
  const base_url = process.env.REACT_APP_BURL;
  const file_url = process.env.REACT_APP_FURL;
  const token = localStorage.getItem("jwt");
  const [ stylist, setStylist ] = useState<StylistDetails>();
  const navigate = useNavigate();



  useEffect(()=>{

    window.scroll({
        top:0,
        behavior:"smooth"
    })

    if(params.id){
      axios({
        url:`${base_url}/auth/users/view-stylist`,
        params:{id:params.id},
        headers:{Authorization:`Bearer ${token}`},
     }).then(response => {   
      const data = response.data?.data;      
        setStylist(data);
     }).catch( error => {
        console.log(error);
            
    }) 
    }
  },[])

  const calcRating = (num:number):JSX.Element[] => {
    let stars = [];
    const rating = num || 0
   
          for(let i = 1; i <= 5; i++){
      if(i <= rating){
        stars.push(<Stars key={i} />)
      }else{
        stars.push(<Stars key={i} isColored={false} />)
      }
    }
    return stars;
  }

  

    return (
        <div>
            <TopBoard />
            <TopSect>
                <StylistPic src={`${file_url}?name=${stylist?.profilePic}`} />
                    <ColumnContainer>
                        <section>
                            <div>
                            <h2>{`${stylist?.firstname} ${stylist?.lastname}`}</h2><img src={appLogo} /><p>{`(${ formatCompactNumber(stylist?.igfollowers|| 0)} followers on IG)`}</p>
                            </div>
                            <data>
                                <p>{stylist?.bio}</p>
                            </data>
                           {stylist?.certificateType &&
                            <span>
                                 <Badge /><p>{`${stylist?.certificateType}`}</p>
                            </span>
                            }
                            <div>
                                <div>
                                 <h3>Specialty</h3>
                                    <div >
                                        { Array.isArray(stylist?.specialties) 
                                        ? stylist?.specialties.map( (specialty, i ) => <span>{formatEnum(specialty)}</span>)
                                        : <p>No specialties</p>    
                                    }
                                    </div>
                                </div>
                            </div>
                        </section>

                        <ul >
                        <BoardCredentials style={{background:"transparent",padding:"0"}}>
                            <span><Distance  /><p >5 km from town centre </p></span> 
                            <span><Address /><p>{stylist?.location}</p></span> 
                            <span><Mobile /><p>{stylist?.mobile}</p></span> 
                            <span><Mail /><p>{stylist?.email}</p></span> 
                            {stylist?.certificate && <span><Links /><p>{stylist.certificateType}</p></span> }
                        </BoardCredentials>
                            <div>
                                <img onClick={()=>window.open(stylist?.facebook||"","_blanck")} src={facebook} />
                                <img onClick={()=>window.open(stylist?.instagram||"","_blanck")} src={instagram} />
                                <img  src={mail} />
                            </div>
                        </ul>
                    </ColumnContainer>
            </TopSect>
            <MainGallery>
                <span> <h3>Gallery</h3> <h4 >{`${stylist?.galleryImages && stylist.galleryImages?.length > 10 ? 'View All' : ''}`}</h4></span>
                <div >
                    { Array.isArray(stylist?.galleryImages) && stylist?.galleryImages.map( (image,i) => <img src={`${file_url}?name=${image}`} /> )}
                    
                </div>
            </MainGallery>
            <ReviewSection>
                 <span> <h3>{`Reviews (${stylist?.reviews?.length})`}</h3> <h4 style={{}}>{`${stylist?.reviews && stylist.reviews?.length > 5 ? 'View All' : ''}`}</h4></span>
                 {(stylist?.galleryImages) && stylist?.galleryImages?.length > 0  ? 

                 stylist.reviews.map( review =>
                   <Review key={review.id}>
                       <span><p>{`${getName(review?.user?.full_name)}`}</p></span>
                        <div>

                        <div><h4>{`${review?.user?.full_name}`}</h4> <data>{calcRating(review?.count)}</data></div>
                        <div><p>{`${review?.message}`}</p></div>
                    </div>
                    </Review> 
                 )
                  
                    : <p>no reviews yet</p>
                }
            </ReviewSection>
        </div>
    )
}