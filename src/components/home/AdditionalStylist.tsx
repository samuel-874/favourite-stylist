import { StylistCredentials } from "../../types/appTypes";
import { StylistCard } from "../stylist card/StylistCard"
import { CardSection } from "./Home.styles"
import testProfile from "../../assets/test-profile.svg";

import { TopSection } from "./Home.styles"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FilterContext } from "./Home";
import { Pagination } from "../pagination/Pagination";





export const AddtionalStylist = () => {


  const filter = useContext(FilterContext);

  const base_url = process.env.REACT_APP_BURL;
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [ paginationData, setPaginationData ] = useState({
    pageNumber:0,pageSize:0,totalItems:0,totalPages:0
  })
  const [ page, updatePage ] = useState(0);
  const [ addtionalStylist , updateAdditionalStylist ] = useState<StylistCredentials[]|string>("loading...");

    // const address = "1044 E. Green Street, Pasadena, FL, US 91106 Floria, USA";
    // const stylist:StylistCredentials = {
    //   averageRatings:3,
    //   firstname:"Kunle ",
    //    lastname:"Aford",
    //     distance:8,
    //      mobile:"(234) 9153065907",
    //       location:address ,
    //       profilePic:testProfile,
    //        isLiked:false  
    // }


    useEffect(()=>{
      axios({
        url:`${base_url}/auth/users/get-list`,
        params:{size:6,page:page,sort:"id"},
        headers:{Authorization:`Bearer ${token}`}
      }).then( response => {
          const data = response?.data            
          setPaginationData({pageNumber:data?.pageNumber + 1,pageSize:data?.pageSize,totalItems:data?.totalItems,totalPages:( data?.totalPages )})
          updateAdditionalStylist(data?.data)
      }).catch( error => {
          updateAdditionalStylist("unable to get items")
      })
    },[page])


    return (
        <div>
           <TopSection>
             <h1>Other Stylists</h1>
             <h2><strong>{`${ paginationData.pageNumber  === paginationData.totalPages ? paginationData.totalItems  : paginationData.pageNumber * paginationData.pageSize}  of ${ paginationData.totalItems } `}</strong> stylists have been hand-vetted for your hair needs</h2> 
           </TopSection>
          <CardSection style={{backgroundColor:"",padding:"30px 0"}}>
           {  Array.isArray(addtionalStylist) ?
             addtionalStylist.map( (stylist) =>  <StylistCard key={stylist?.id} props={stylist} />)
          : addtionalStylist
          }
          </CardSection>

          <Pagination data={paginationData} updatePage={updatePage} />
        </div>
    )
}