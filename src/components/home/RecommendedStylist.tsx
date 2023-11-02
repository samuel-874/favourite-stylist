import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react"
import { StylistCard } from "../stylist card/StylistCard";
import { CardSection,    TopSection } from "./Home.styles"
import { StylistCredentials } from "../../types/appTypes";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FilterContext, StylistContext } from "./Home";
import { Pagination } from "../pagination/Pagination";
import { FilterBoard } from "../../general/GeneralComponents";



export const RecommendedStylist = () => {

    const [ requestedStylist, updateRequestStylist ] = useState<StylistCredentials[]>([]);
    const [ requestedStylistClone, updateRequestStylistClone ] = useState<StylistCredentials[]>([]);
    const filter = useContext(FilterContext);
    const base_url = process.env.REACT_APP_BURL;
    const [ searchParam , setSearchParams ] = useSearchParams();
    const token = localStorage.getItem("jwt");
    const [ paginationData, setPaginationData ] = useState({
      pageNumber:0,pageSize:0,totalItems:0,totalPages:0
    });

    const updatePage = (number:number) =>{
      searchParam.set("page",number.toString())
      setSearchParams(searchParam)
   }




    const location = searchParam.get("search_query")

    useEffect(()=>{
      console.log(filter?.itemsFilter.filter);
/* {
    "certification": "",
    "worksWithKids": true,
    "curlySistersStylist": true,
    "colorHairStylist": true,
    "hairType": "",
    "seeAll": true
} */

      if(requestedStylist && Array.isArray(requestedStylist)){

        

      //   if(filter?.itemsFilter?.filter?.worksWithKids || filter?.itemsFilter?.filter?.certification || filter?.itemsFilter?.filter?.colorHairStylist || filter?.itemsFilter?.filter?.worksWithKids || filter?.itemsFilter?.filter?.hairType){
      //   const stylistArray:StylistCredentials[] = [];

      //   if(filter?.itemsFilter?.filter?.worksWithKids){
      //     const stylistWorkingWithKids =  requestedStylistClone.filter( stylist => stylist.specialties?.includes("KIDS"))
      //     stylistArray.push(...stylistWorkingWithKids)
      //   }
      //   if(filter?.itemsFilter?.filter?.colorHairStylist){
      //     const stylistSpecializedWithColors =  requestedStylistClone.filter( stylist => stylist.specialties?.includes("COLOR_SPECIALIST"))
      //     stylistArray.push(...stylistSpecializedWithColors)
      //   }

      //   if(filter?.itemsFilter?.filter?.hairType){
      //     const stylists =  requestedStylistClone.filter( stylist => stylist.specialties?.includes(filter?.itemsFilter?.filter?.hairType))
      //     stylistArray.push(...stylists)

      //   }

      //   if(filter?.itemsFilter?.filter?.certification){
      //     const stylists =  requestedStylistClone.filter( stylist => stylist.specialties?.includes(filter?.itemsFilter?.filter?.certification))
      //     stylistArray.push(...stylists)
      //   }

      //   updateRequestStylist(stylistArray);
      // }
    }
      
    },[filter])
    useEffect(()=>{

    window.scroll({
            top:0,
            behavior:"smooth"
    })

      const currentPage = searchParam.get("page");
        if(location){
         axios({
          url:`${base_url}/auth/users/find`,
          params:{location:location,size:5,page:currentPage},
          headers:{Authorization:`Bearer ${token}`}
        }).then( response => {
            const data = response?.data            
            setPaginationData({pageNumber:data?.pageNumber + 1,pageSize:data?.pageSize,totalItems:data?.totalItems,totalPages:data?.totalPages})
            updateRequestStylist(data?.data)
            updateRequestStylistClone(data?.data)
            
        }).catch( error => {
  
        })
        }
     
      },[searchParam])

    return (
    <div>

          <TopSection style={{padding:"0px 50px 50px 40px"}}>
             <span>
                <h1>Recommended Curly Sister Stylists</h1>
             </span>
             <h2><strong>{`${ paginationData.pageNumber  === paginationData.totalPages ? paginationData.totalItems  : paginationData.pageNumber * paginationData.pageSize}  of ${ paginationData.totalItems } `}</strong> stylists have been hand-vetted for your hair needs</h2> 
           </TopSection>
           <div>
            <CardSection layout={filter?.itemsFilter?.display} >
                { requestedStylist.map( stylist => 
                  <StylistCard 
                    key={stylist?.id} 
                    props={stylist} 
                    layout={filter?.itemsFilter.display}
                  />)
                  } 
            </CardSection>
           </div>
          
           <Pagination data={paginationData} updatePage={updatePage} />
    </div>)
    
}