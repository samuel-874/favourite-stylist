import { CardVideoPreview, Rectangle, ArticlePreview } from "../../general/GeneralComponents";
import { StylistCard } from "../stylist card/StylistCard";
import { Relative, StyledCard } from "../../general/GeneralComponents.styles"
import { CardSection,  GridLayout,  MiddleSection, Page,  TopSection, ScrollView, Section } from "./Home.styles"
import { useEffect, useState } from "react";
import axios from "axios";
import { Article, OrderDetail, StylistCredentials, Video } from "../../types/appTypes"
import { useNavigate } from "react-router-dom";
import { StylistShortDetails } from "../details/stylist/StylistShortDetails";

export const HomeInfo = () => {

  const [ recomendedStylist, updateRecomendedStylist ] = useState<StylistCredentials[]|string>("loading");
  const [ recommendedArticles, updateRecommendedArticles ] = useState<Article[]>([]);
  const [ currentLocation , setCurrentLocation ] = useState("lagos")
  const [ recentlyViewedArticles, updateRecentlyViewedArticles ] = useState<Article[]>([]);
  const navigate = useNavigate();
  const [ recommendedVideos, updateRecommendedVideos ] = useState<Video[]>([]);
  const [ recentOrders, updateRecentOrders ] = useState<OrderDetail[]>([]);
  const base_url = process.env.REACT_APP_BURL;
  const token = localStorage.getItem("jwt");
  
    // axios({
      //   url:`https://ipinfo.io/json?token=bc5583e42988aa`
      // }).then( data => {
    //  const country = data.data.country;
    //   const region = data.data.region;
    //   console.log(data);

    //   console.log(region);
    // }).catch((error)=>{
            
    // })

  useEffect(()=>{

      axios({
        url:`${base_url}/auth/users/home-info`,
        params:{location:currentLocation},
        headers:{Authorization:`Bearer ${token}`}
      }).then( response =>{
        const data = response?.data?.data
        updateRecomendedStylist(data?.stylists)
        updateRecommendedArticles(data?.recommendedArticles)
        updateRecentlyViewedArticles(data?.recentlyViewed)
        updateRecommendedVideos(data?.recommendedVideos)
        updateRecentOrders(data?.upcomingBookings||[])
      }).catch( error =>{
        updateRecomendedStylist([])
        updateRecommendedArticles([])
        updateRecentlyViewedArticles([])
        updateRecommendedVideos([])
          console.log(error);
      })
  
  },[])

         
   

    return (
        <Page>
        <Relative style={{paddingLeft:"50px",paddingRight:"50px"}}>
          <TopSection>
            <h1> Popular stylists in your area</h1>
            <h2>Stylist around your area that are getting some lights </h2> 
            <h5 onClick={()=>navigate(`?search_query=${currentLocation}&index=2`)}>see all</h5>
          </TopSection>
          <CardSection layout="grid" style={{padding:"40px 0"}}>
            {
              Array.isArray(recomendedStylist) ?
              ( recomendedStylist.length > 0 ?
               recomendedStylist.map(( stylist,index )=> 
               <StylistCard 
                  key={index} 
                  props={stylist} 
                /> ):"No Stylist in your location")
                : "loading..."
            }
          </CardSection>
        </Relative>
        <MiddleSection>
          <div style={{padding:"10px"}}>
           <TopSection>
             <span>
                <h1> Upcoming Bookings</h1>
                <h3 onClick={()=>navigate("/bookings")}>see all</h3>
             </span>
             <h2>These are the appointments you have upcoming</h2> 
           </TopSection>
           <GridLayout>
            {recentOrders.length > 0 ?
              recentOrders.map( (order,i) => <Rectangle key={i} order={order} />)
            :<p>No orders yet</p>
          }
           </GridLayout>
          </div>
          <div style={{padding:"10px"}}>
          <TopSection>
              <span>
                <h1>Recently Viewed</h1>
                <h3 onClick={()=>navigate("/recently-viewed")}>see all</h3>
              </span>
              <h2>Articles and videos you viewed recently </h2> 
          </TopSection>
          <GridLayout>
              { recentlyViewedArticles?.length > 0 ?
                recentlyViewedArticles?.map( ( articleView, index ) => <ArticlePreview key={index} prop={articleView} />)
                :
                <p>No item</p>
              }
           </GridLayout>
          </div>
        </MiddleSection>
        <Section>
        <TopSection>
           <span>
              <h1>Popular videos</h1>
              <h3 onClick={()=>navigate("/video-list")}>see all</h3>
            </span>
            <h2>See trending stylists located around you </h2> 
          </TopSection>
          
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
            { recommendedVideos?.length > 0 &&
              recommendedVideos?.map( (video,index) => <CardVideoPreview key={index} prop={video} />)
            }
          </div>
        </Section>
    { recommendedArticles?.length > 0 &&
     
       <Section>
         <TopSection>
           <span>
              <h1>Interesting Articles</h1>
              <h3 onClick={()=>navigate("/article-list")}>see all</h3>
           </span>
           <h2>See trending stylists located around you</h2> 
         </TopSection>
         <ScrollView>
          { recommendedArticles.map( (articleView,index) => <ArticlePreview key={index} prop={articleView} />) }
         </ScrollView>
       </Section>
    }
      </Page>
    )
}