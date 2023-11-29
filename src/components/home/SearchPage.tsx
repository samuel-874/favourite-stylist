import { StylistCard } from "../stylist card/StylistCard";
import testProfile from "../../assets/test-profile.svg"
import { CardSection,    TopSection } from "./Home.styles"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StylistCredentials } from "../../types/appTypes";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FilterContext } from "./Home";
import { AddtionalStylist } from "./AdditionalStylist";



export const SearchPage = () => {

  const filter = useContext(FilterContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const base_url = process.env.REACT_APP_BURL;
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [ paginationData, setPaginationData ] = useState({
    pageNumber:0,pageSize:0,totalItems:0,totalPages:3
  })
  const [ requestStylist, updateRequestStylist ] = useState<StylistCredentials[]|string>("loading...");
  
    const address = "1044 E. Green Street, Pasadena, FL, US 91106 Floria, USA";
    const stylist:StylistCredentials = {
      averageRatings:3,
      firstname:"Kunle ",
       lastname:"Aford",
        distance:8,
         mobile:"(234) 9153065907",
          location:address ,
          profilePic:testProfile,
           isLiked:false  
    }
    const query = new URLSearchParams(window.location.search).get("search_query");

    const updateLocation = () => {
      searchParams.set("index","2")
      setSearchParams(searchParams)
    }

    const searchStylist = () => {
      
      axios({
        url:`${base_url}/auth/users/find`,
        params:{location:query,size:3,page:0},
        headers:{Authorization:`Bearer ${token}`}
      }).then( response => {
        const data = response.data
          setPaginationData({pageNumber:data?.pageNumber+1,pageSize:data?.pageSize,totalItems:data?.totalItems,totalPages:data?.totalPages})
          updateRequestStylist(data.data)
      }).catch( error => {
        
      })
    }

    
    useEffect(()=>{

        searchStylist()

    },[query])


    return (
        <div style={{background:"",minHeight:"40dvh"}}>
            <TopSection style={{padding:"50px"}}>
             <span>
                <h1>Curly Sister Stylists</h1>
                <h3 onClick={updateLocation}>see all</h3>
             </span>
             <h2><strong>{`${paginationData.pageNumber * paginationData.pageSize}  of ${ paginationData.totalItems } `}</strong> stylists have been hand-vetted for your hair needs</h2> 
           </TopSection>
           <CardSection layout={filter?.itemsFilter?.display}   color="#F4F4F4" >
              { Array.isArray(requestStylist) ?
               requestStylist.map( stylist => 
               <StylistCard key={stylist?.id} props={stylist} layout={filter?.itemsFilter.display||"grid"}    />)
                : "Please wait..."
              } 
          </CardSection>
          <div style={{padding:'60px'}}>
     
           <AddtionalStylist />
      
          </div>
        </div>
    )
}