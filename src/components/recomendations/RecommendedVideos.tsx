import { Article, Video } from "../../types/appTypes";
import { ArticlePreview, CardVideoPreview } from "../../general/GeneralComponents";
import { CardSection, GridLayout, ScrollView, TopSection, VidSection } from "../home/Home.styles";
import { useState, useEffect } from "react";
import axios from "axios"
import { Pagination } from "../pagination/Pagination";


export const RecommendedVideos = () => {

    const [ recommendedArticles, updateRecommendedArticles ] = useState<Video[]|string>("loading...");
    const base_url = process.env.REACT_APP_BURL;
    const token = localStorage.getItem("jwt");
    const [ page, updatePage ] = useState(0);
    const [ paginationData, setPaginationData ] = useState({
        pageNumber:0,pageSize:0,totalItems:0,totalPages:0
      })


      
      useEffect(()=>{

         window.scroll({
            top:0,
            behavior:"smooth"
          })

          
            axios({
               url:`${base_url}/auth/users/view-list`,
               headers:{Authorization:`Bearer ${token}`},
               params:{size:5,page:page}
            }).then( response => {
               const data = response?.data            
               setPaginationData({pageNumber:data?.pageNumber + 1,pageSize:data?.pageSize,totalItems:data?.totalItems,totalPages:( data?.totalPages )})
               updateRecommendedArticles(data?.data)
            }).catch( error => {
               console.log(error);
            })

      },[page])




    return (
        <div >
        <TopSection style={{padding:"30px"}}>
          <span>
             <h1>Interesting Articles</h1>
          </span>
          <h2>See trending stylists located around you</h2> 
        </TopSection>
        <VidSection>
              {
            Array.isArray(recommendedArticles) ?
         recommendedArticles.map( (articleView,index) => <CardVideoPreview  key={index} prop={articleView} />)
            : recommendedArticles
        }

        </VidSection>
        <Pagination data={paginationData} updatePage={updatePage} />
      </div>
    )
} 