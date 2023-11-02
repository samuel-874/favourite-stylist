import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"
import { Content, StyledDetails, Topic } from "./ArticleDetails.styles";
import { Article } from "../../../types/appTypes";
import { Img } from "../../form/signin/Signin.styles";

export const ArticleDetails = () => {

    const [ article, updateArticle ] = useState<Article|undefined>({content:"",id:0,likes:0,title:"",views:0})
    const base_url = process.env.REACT_APP_BURL
    const image_url = process.env.REACT_APP_FURL
    const token = localStorage.getItem("jwt");
    const navigate = useNavigate();
    const param = useParams();



    useEffect(()=>{

        window.scroll({
            top:0,
            behavior:"smooth",
        })
        
        if(param.id ){
            axios({
               url:`${base_url}/auth/users/article`,
               headers:{Authorization:`Bearer ${token}`},
                params:{id:param.id}
            }).then(response => {    
              updateArticle(response.data?.data)
            }).catch( error => {
                    console.log(error);
                    if(error?.response?.data?.message === "Article not found"){
                        updateArticle(undefined)
                }
           }) 
        }
    },[])

    
    return (
        article?.content !== undefined   ?
       (
        
        article?.content.length > 4 ?
        <StyledDetails>
            <Topic>
                <div>
                    <p>{article?.title}</p>
                    <hr />
                    <span><img src={`${image_url}?name=${article?.stylists?.profile}`} /><h4>{article?.stylists?.full_name}</h4></span>
                    <hr />
                </div>
            </Topic>
            <div style={{padding:" 40px 0 "}}>

            {<Img width={"80dvw"} style={{marginLeft:"auto",marginRight:"auto"}} src={`${image_url}?name=${article?.thumbnail}`} />}
            <p style={{textAlign:"center"}}>{`total views : ${article?.views}`}</p>
            <Content>
                <h1>Content</h1>
                {article?.content}
            </Content>
            </div>
        </StyledDetails>
        : <p>Loading...</p> 
        )
        : <p>{`It Looks like the article you look for has been deleted or doesn't exists`}</p>
    )
}