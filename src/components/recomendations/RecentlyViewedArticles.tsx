import { Article } from "../../types/appTypes";
import { ArticlePreview } from "../../general/GeneralComponents";
import { GridLayout, ScrollView, Section, TopSection, VidSection } from "../home/Home.styles";
import { useState, useEffect } from "react";
import axios from "axios"
import { Pagination } from "../pagination/Pagination";


export const RecentlyViewedArticles = () => {

    const [ recommendedArticles, updateRecommendedArticles ] = useState<Article[]|string>("loading...");
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
                url:`${base_url}/auth/users/recently-viewed`,
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
        <Section>
          <TopSection>
            <span>
              <h1>Interesting Articles</h1>
            </span>
            <h2>See trending stylists located around you</h2> 
          </TopSection>
          <GridLayout>
                { 
              Array.isArray(recommendedArticles) ?
                  recommendedArticles.map( (articleView,index) => <ArticlePreview  key={index} prop={articleView} />)
              : recommendedArticles
          }
          </GridLayout>
          <Pagination data={paginationData} updatePage={updatePage} />
      </Section>
    )
} 