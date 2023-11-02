import { useState, useEffect, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { Bed, DivInput, Hambugger, ItemsDiv, Loading, MenuBoard, ProfileView, Styled404Page, StyledCard, StyledCard2, StyledFilter, StyledFooter, StyledPreview, StyledRectangle, StyledVideoCard,  } from "./GeneralComponents.styles";
import { Img, StyledButton } from "../components/form/signin/Signin.styles";
import { CardIcon, ResponseCheck,  SentMail, Scissors, Gift, Check2, Zoom,  } from "../react-icons/Icons";
import spreadItems from "../assets/bg.svg";
import { closeInfo } from "../redux/slices/InfoSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import userIcon from "../assets/user.svg";
import logout from "../assets/logout.svg";
import { Article, MenuList, OrderDetail, Video } from "../types/appTypes";

import { capitalize, formatCompactNumber } from "./service";
import socialMedias from "../assets/Frame 106.svg"
import { BoardCredentials, Bottom, Gallery, StyledSection, StyledShort } from "../components/details/stylist/Stylist.styles";
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { BCStatus, Buttons, MeetingLink } from "../components/orders/Orders.styles";
import moment from "moment";
import { FilterContext } from "../components/home/Home";

const file_url = process.env.REACT_APP_FURL

export const Card = ():JSX.Element =>{
    const info = useAppSelector( (state) => state.info);
    const dispatch = useAppDispatch()
    const location = window.location;
    const {
            icon,
            showInfo,
            heading,
            message,
            isError,
            buttonText,
            url
        } = info;

    const navigate = () => {
      if(url === "close_page"){
          dispatch(closeInfo())
      }else{
        location.assign(url)
      }
    }

    return (
       showInfo ?
       <div>
        <Bed></Bed>
         <StyledCard>
           <h1>{heading}</h1>
           <div style={{width:'100%',backgroundImage:`url(${spreadItems})`}}>
           { icon === 'message' 
            ?
              <SentMail />
            :( icon === "check" ?
            <ResponseCheck success={!isError} />
            :( <CardIcon success={!isError} />))
            
           
            }
           </div>
           <p>{message}</p>
           <StyledButton onClick={navigate}>{buttonText}</StyledButton>
         </StyledCard>
       </div>
       :
       <></>
    )

}

export const InfoCard2 = ():JSX.Element =>{
    const info = useAppSelector( (state) => state.info);
    const nav = useNavigate();
    const dispatch = useAppDispatch()
    const {
            showInfo,
            heading,
            message,
            isError,
            buttonText,
            url,
            middleSec,meetLink,buttonText2,instruction
        } = info;

    const navigate = () => {
      if(url === "close_page"|| url === "close"){
          dispatch(closeInfo())
      }else if(url === "refresh"){
        window.location.reload();
      }else{
        dispatch(closeInfo())
        nav(url)
      }
    }

    return (
       showInfo ?
       <div>
        <Bed></Bed>
         <StyledCard2>
          <Check2 success={!isError} />
           <h1>{heading}</h1>
           <p>{message}</p>
           { middleSec && 
           <>      
              <form>
                      <>
                       <Zoom />
                        <h6>Zoom Link : </h6>
                      </>
                       
                        <h5 >{meetLink}</h5>
              </form>
           <h4>{instruction}</h4>
           </>   }
           <Buttons style={{background:"transparent",width:"100%"}}>

           <div onClick={navigate} style={{ width: buttonText2 ? "45%" :"100%"}}>{buttonText}</div>
           { buttonText2 && <span style={{color:"FF8500"}}>{buttonText2}</span>}
           </Buttons>
           
         </StyledCard2>
       </div>
       :
       <></>
    )

}


export const Loader = () => {
  const isLoading = useAppSelector( state => state.loading.isLoading);

  return (
    isLoading ?
    <Loading>
      <div className="loader"></div>
    </Loading>
    :
    <></>
  )
}

export const Helper = (func:any) => {
    func();
    return (
      <h1></h1>
    )
}

export const ActivateAccount = () => {
  const { REACT_APP_BURL } = process.env;
  
  const params = useParams();
  const encodedValue = params.token
  if(!encodedValue){
      window.location.assign("404?error=invalid-action")
  }

  const token = window.atob(encodedValue||"")

  const otp = token?.substring(64,70);
  const email = token?.substring(70);

  axios({
      url:`${REACT_APP_BURL}/users/activate`,
      method:"PUT",
      params:{otp,email}
    }).then( () => {
     window.location.assign("/signin?status=successful")
    }).catch( () => {
      window.location.assign("/signin?status=failed")
    })


    return (
      <div>
        Loading...
      </div>
    )
}

export const HambuggerMenu = ({isOpened,toggleOpen}:{isOpened:boolean,toggleOpen:Function}) =>{
  return (
    <Hambugger onClick={() => toggleOpen( (val:boolean) => !val)}>
      <span style={{transform: isOpened ? "rotate(45deg) translate(5px,5px)" : "",transition:"0.4s"}} ></span>
      <span style={{opacity: isOpened ? "0":"1",transition:"0.4s" }}></span>
      <span  style={{transform: isOpened ? "rotate(-45deg) translate(5px, -4px)" : "",transition:"0.4s"}}></span>
    </Hambugger>
  )
}


export const Menu = ({list,userInfo}:{list:MenuList[],userInfo:{firstname:string,lastname:string}}) => {



  return (
    <MenuBoard>
     <div><ProfileView  style={{width:"30px",height:"30px",borderStyle:"none",borderRadius:"15px",color:"#FFFF",marginLeft:"3px",marginRight:"6px",display:"inline-flex"}}>{`${userInfo.firstname.charAt(0).toUpperCase()}${userInfo.lastname.charAt(0).toUpperCase()}`}</ProfileView>
        <p>{`${capitalize(userInfo.firstname)} ${capitalize(userInfo.lastname)}`}</p>
        </div> 
      <hr />
      {list.map( item => <ItemsDiv key={item.key}><Img src={userIcon} /> <A  prop={item}  /></ItemsDiv> )}
      <div ><Img src={userIcon} />  <a href="#"  >{"Profile"}</a></div>
      <div ><Img src={userIcon} />  <a href="#"  >{"Hair Profile"}</a></div>
      <div><Img src={logout} /> <a href="/signin?logout=true"  >Logout</a></div>
    </MenuBoard>
  )
}


export const A = ({prop}:{prop:MenuList}) => {
  
  const location = useLocation();
  const [ path,setPath ] = useState(location.pathname);
  const { link, label } = prop;
  const [ isActive, toggleActive ] = useState(false);

  const checkActive = () => {

    if(path.startsWith("/video-list") && prop.label === "Studio"){
      return true;
    }else if(path.startsWith("/bookings") && prop.label === "Bookings"){
      return true;
    }else if(prop.label === "Home" && path === "/"){
      return true;
    }

    return false;
  }

  useEffect(()=>{

    setPath(location.pathname)
    toggleActive(checkActive())

  },[location])


  
  return (
    <a href={link}   style={{color: isActive ? "#FF8500" : "#000" }}  >{label}</a>
  )
}

export const Rectangle = ({order}:{order:OrderDetail}) => {

  const status = order?.status === "CANCELLED" ? "Cancelled" : ( order?.status ===  "PROCESSING" ? "In progress" :( order?.status ===  "COMPLETED" ? "Completed" : "Upcoming" ));
  const color = order?.status === "CANCELLED" ? "#DF0000" :  ( order?.status ===  "PROCESSING" ? "#518EF8" :( order?.status ===  "COMPLETED" ? "#28B446" : "#FBBB00" ));


  
  return (
    <StyledRectangle>
      <div>
        <h1>{order?.service}</h1>
        <p>&bull;  {order?.stylist}</p>
      </div>
      <span>
        <BCStatus color={color}> <span></span><h4>{status}</h4></BCStatus>
        <h5>{moment(order.date).format("MMMM D, YYYY h:mma")} </h5>
      </span>
    </StyledRectangle>
  )
}

export const ArticlePreview = ({prop}:{prop:Article}) => {
  const navigate = useNavigate();
  return (
    <StyledPreview onClick={()=>navigate(`/articles/${prop.id}`)}>
    <img src={`${file_url}?name=${prop.thumbnail}`} alt="..." />
      <div style={{display:"flex",alignItems:"center"}}><p>{prop.title}</p></div>
      <span>
        <Scissors />
      </span>
    </StyledPreview>
  )
}

export const CardVideoPreview = ({prop}:{prop:Video}) =>{
  const navigate = useNavigate();
  return (
    <StyledVideoCard onClick={()=>navigate(`/videos/${prop.id}`)}>
      <div style={{borderStyle:"none",borderRadius:" 10px 10px 0px 0px"}}>
        <Img src={`${file_url}?name=${prop.thumbnail}`} />
      </div>
      <div style={{padding:"10px"}}>
        <p>{` ${formatCompactNumber(prop.views)} views `}</p>
        <span>{prop.title}</span>
      </div>
    </StyledVideoCard>
  )
}

export const NotFound = () => {
    return (
      <Styled404Page>
        <h1>Oops!</h1>
        <p>Looks like you enter an invalid route. Click here to go <a href="/">home</a> </p>
      </Styled404Page>
    )
}

export const Footer = () => {
  return (
    <StyledFooter>
        <section>
        <div>
            <h1>About Curly Sister</h1>
            <p>We have created an online curated experience 
                to help you reach your wavy and curly dreams. </p>
                <Img src={socialMedias} />
            <a href="#">Learn more about us</a>
        </div>
        <div>
            <h1>Useful Links</h1>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
        </div>
        <div>
            <h2>Not Listed in Our Database?</h2>
            <DivInput> <input type="text" placeholder="Enter your email" /><button>Join Us</button></DivInput>
        </div>
        </section>
        <span>
            <p>© Curly sister 2021</p>
        </span>
    </StyledFooter>
  )
}

export const StylistSKeleton = () =>{

  return( 
    <StyledShort>
    <metadata> 
      <div>
      <span style={{display:"flex",flexDirection:"column",flex:"1"}}>
          <Skeleton width={100} />
          <Skeleton style={{marginTop:"20px"}} />
      </span>
      </div>
      
    </metadata>
    <hr />
    <StyledSection>
      <Skeleton containerClassName="flex-1"  circle={true} />
      <div>
        <Skeleton width={300} />
        <Skeleton width={300} style={{margin:"10px 0"}} />
        <Skeleton width={300} />
      </div>
  
    </StyledSection>
    <BoardCredentials>
         <Skeleton style={{height:"145px",width:"100%"}} />
    </BoardCredentials>
    { 
    
    <Gallery>
      <span>
      <h3><Skeleton /></h3> <h4><Skeleton /></h4>

      </span>
      <div>
      <Skeleton height={100} width={90} count={4} />

      </div>
    </Gallery>
    }
    <Bottom>
      <p ><Skeleton /></p>
      <p><Skeleton /></p>
    </Bottom>
  </StyledShort>
  )
}

export const GiftBoard = ({showFull,toggleShowFull}:{showFull:boolean,toggleShowFull:Function}) => {
  

  useEffect(()=>{

    setTimeout(() => {
      toggleShowFull(true)
    }, 3000);

    setTimeout(() => {
      toggleShowFull(false)
    }, 5100);
  },[])

  window.addEventListener("keydown",(e)=>{
    if(e.key === "Escape"){
      toggleShowFull(false) 
    }
  })

  const handleHover = () => {
      toggleShowFull(!showFull)
      console.log("showed");
      
  }

  window.addEventListener("keyup",(e)=>{
      if(e.key === "Escape"){
        if(showFull){
          toggleShowFull(false)
        }
      }
  })

  
  const boardStyles2:Object = {position:"fixed",right:"30px",top:"50dvh",transition:" 1s width",cursor:"pointer"};

  const boardStyled1:Object = {background:"blue",width:"420px",maxWidth:"90dvw",
                               height:"110px",borderRadius:"10px",backgroundColor:"#590BA9",
                               display:"flex",justifyContent:"space-around",alignItems:"center",
                               paddingLeft:"20px",paddingRight:"10px",...boardStyles2};


  const leftSecStyles1:Object = {width:"70px",height:"70px",borderRadius:"74px",
                                  background:"#FFF",display:"flex",justifyContent:"center",
                                  alignItems:"center",flexShrink:"0",margin:"0 8px"};

  const leftSecStyles2:Object = {...leftSecStyles1, background:"#590BA9"};



    return (
      <div onMouseEnter={handleHover} onMouseLeave={handleHover} style={showFull ? boardStyled1 : boardStyles2}>
        <div style={showFull ? leftSecStyles1 : leftSecStyles2}>
          <Gift color={showFull ? "#590BA9" : undefined} />
        </div>
        <div style={{display: showFull ? "inline-block":"none"}}>
          <p style={{color:"#FFF",fontSize:"17px",fontWeight:"600",lineHeight:"normal",textTransform:"capitalize"}}>gift a stylist</p>
          <p style={{color:"#FFF",fontSize:"15px",fontWeight:"400"}}>60 minutes @ €55.00</p>
          <p style={{color:"#FFF",fontSize:"13.5px",fontWeight:"300"}}>Gift your friend or loved one with any available stylist.</p>
        </div>
      </div>
    )
}

export const FilterBoard = ({toggleShow}:{toggleShow:Function}) => {

  const [ cliterial, setCliterial ] = useState({
    worksWithKids:"",colorSecialist:"",hairType:"",certification:""
  });
  const filter = useContext(FilterContext);
  const updateColorSpecialist = (val:"yes"|"no") =>{
    setCliterial( clt =>{
      return {
        ...clt,colorSecialist:val
      }
    })
  }

  const updateWWK = (val:"yes"|"no") =>{
    setCliterial( clt =>{
      return {
        ...clt,worksWithKids:val
      }
    })
  }

  const applyFilter = () =>{

    /*       certification:"",
      worksWithKids:true,
      curlySistersStylist:true,
      colorHairStylist:true,
      seeAll:true */
    const { worksWithKids, colorSecialist,hairType,certification } = cliterial;
    filter?.updateItemsFilter({
        ...filter.itemsFilter,
        filter:{
          certification:certification,
          worksWithKids:worksWithKids,
          colorHairStylist:colorSecialist,
          hairType:hairType
        }
        })

        toggleShow(false);
  }


  return (
    <div>
      <Bed onClick={()=>toggleShow(false)}></Bed>
      <StyledFilter>
        <h3>Filter by </h3>
        <div>
          <p>Certification</p>
          <select name="" id="" onChange={(e)=>setCliterial( clt => {
            return {
              ...clt,certification:e.target.value
            }
          })}>
            <option selected disabled hidden >Select Certifications</option>
            <option value="PROFESSIONAL">Profesional certification</option>
            <option value="INTERMEDIATE">Intermediate ceretification</option>
            <option value="ENTRY_LEVEL">Entrylevel certification</option>
          </select>
        </div>
        <div>
          <p>Type of hair</p>
          <select name="" onChange={(e)=>setCliterial( clt =>{
            return {
              ...clt,hairType:e.target.value
            }
          })} >
            <option selected disabled hidden >Select type of hair</option>
            <option value="CURLY_SECIALIST">Curly</option>
            <option value="WAVY_SECIALIST">Wavy</option>
            <option value="NATURAL_HAIR">Natural hair</option>
          </select>
        </div>
        <hr />
        <div>
          <p>Works with Kids?</p>
          <data>
            <input type="checkbox" checked={cliterial.worksWithKids === "yes"} value={"yes"} onChange={() =>updateWWK("yes") } name="" id="" />
            <p>Yes</p>
          </data>
          <data>
            <input type="checkbox" checked={cliterial.worksWithKids === "no"} value={"no"}  onChange={() => updateWWK("no") } name="" id="" />
            <p>no</p>
          </data>
        </div>
        <div>
          <p>Color specialist?</p>
          <data>
            <input type="checkbox" checked={cliterial.colorSecialist === "yes"}  onChange={() => updateColorSpecialist("yes")} name="" id="" />
            <p>Yes</p>
          </data>
          <data>
            <input type="checkbox" checked={cliterial.colorSecialist === "no"} onChange={() => updateColorSpecialist("no") } name="" id="" />
            <p>no</p>
          </data>
        </div>
        <button onClick={applyFilter}>Apply filters</button>
      </StyledFilter>
    </div>
  )

}

