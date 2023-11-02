import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"
import { Content, StyledDetails, Topic } from "../article/ArticleDetails.styles";
import { Article, Comments, Video } from "../../../types/appTypes";
import { Img } from "../../form/signin/Signin.styles";
import { StyledVideo, VidTitle } from "./VideoDetail.styles";
import { Like } from "../../../react-icons/Icons";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { getName } from "../../../general/service";

export const VideoDetails = () => {

    const [ video, updateVideo ] = useState<Video|undefined>({title:"",url:"",views:0,id:0,thumbnail:"",likes:0,isLiked:false})
    const [comments, updateComments ] = useState<Comments[]>([]);
    const [ newComment , updateNewComment ] = useState("");
    const userInfo = useAppSelector((state)=> state.userInfo);
    const base_url = process.env.REACT_APP_BURL
    const image_url = process.env.REACT_APP_FURL
    const token = localStorage.getItem("jwt");
    const navigate = useNavigate();
    const param = useParams();




    const handleSubmit = (e:React.FormEvent) => {

      const comment:Comments = {message:newComment,user:{full_name:`${userInfo.firstname} ${userInfo.lastname}`}};
      e.preventDefault();
      updateComments((oldComments) => {
        return [...oldComments,comment]
      })
        axios({
          method:"POST",
          url:`${base_url}/auth/users/post-comment`,
          headers:{Authorization:`Bearer ${token}`},
          data:{content:newComment,postId:video?.id}
        }).catch((error)=>{
          console.log(error);
        })

        updateNewComment("")
    }

    const handleLike = () => {        
          updateVideo((vidData) => {
            if(vidData != undefined){
                   return {
                ...vidData,
                likes:vidData.isLiked ? vidData.likes - 1 : vidData.likes + 1,
              isLiked:!vidData?.isLiked
           }
            }
        
        })

        axios({
          method:"POST",
          url:`${base_url}/auth/users/like-video`,
          params:{id:video?.id},
          headers:{Authorization:`Bearer ${token}`},
        }).catch((error)=>{
          console.log(error);
          
        })
        
        
    }

    useEffect(()=>{

        if(param.id){
             axios({
               url:`${base_url}/auth/users/view`,
               headers:{Authorization:`Bearer ${token}`},
                params:{id:param.id}
                }).then(response => {    
                    const data = response?.data?.data;
                    updateVideo(data)
                    updateComments(data?.comments)
                    

                }).catch(  error => {
                    console.log(error);
                    if(error?.response?.data?.message === "Article not found"){
                        updateVideo(undefined);    
                    }
                }) 
        }
    },[])

    
    return (
        video != undefined ?
      ( video?.title?.length > 0 
      ? <StyledVideo>
        <div>

          <iframe width="560" height="315" src={video?.url} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" >
          </iframe>
         <VidTitle>{video?.title}</VidTitle> 
        </div>
          <section>
            <p onClick={handleLike}><Like  isLiked={video?.isLiked} /> {video.likes}  </p> 
            <p>views {video.views}</p>
            <form onSubmit={handleSubmit} >
              <input placeholder="add comment" value={newComment} onChange={(e)=>updateNewComment(e.target.value)} />
              <button>save</button>
            </form>  
            <hr />
            <div style={{padding:" 5px 0",height:"260px",overflowY:"scroll"}}>
                {comments.map((comment,index) =>
                <span key={index} >
                  <div>{getName(comment?.user?.full_name)}</div> 
                  <span> <h4>{comment?.user?.full_name}</h4> <p>{comment.message}</p></span>
                </span>
                )}

            </div>
          </section>
          
       </StyledVideo>
       :<p>Loading...</p> )
       :<p>  item request was not found</p>
    )
}