import { useSearchParams } from "react-router-dom";
import { LeftArrow, RightArrow } from "../../react-icons/Icons"
import { Page, StyledPagination } from "./Pagination.styled"


export const Pagination = ({ data,updatePage }: { data: { pageNumber: number, pageSize: number, totalItems: number, totalPages: number },updatePage:Function }) => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const { totalPages, pageNumber } = data;


    let pageArray = []

 

    if(pageNumber < 3 ){
        if(totalPages < 5){
            for( let i = 1 ;i <= totalPages;i++ ){
                pageArray.push(i)
            }
        }else{
          pageArray.push(1,2,3,'...',totalPages);
        }
    } else if(pageNumber === 3 && pageNumber === totalPages){
          pageArray.push(1,2,3);
    } else if(pageNumber >= 3 && pageNumber <  totalPages  ){
        pageArray.push(pageNumber -1,pageNumber ,'...',totalPages);
    }else{
        pageArray.push('...',pageNumber -2,pageNumber -1,pageNumber);
    }

    return (
      totalPages > 1 ?
        <StyledPagination>
            <Page onClick={()=>{
                if(pageNumber -2 >= 0){
                    updatePage(pageNumber - 2)
                }
                }} style={{background:  pageNumber === 1 ? " #A3A3A3":"#FFF",borderWidth:pageNumber === 1 ? "0px":"1px"}} ><LeftArrow color={ pageNumber === 1 ? "#FFF" : "black" } /></Page>
                {pageArray.map( (page,index) => <Page onClick={()=>{
                    if(typeof page === "number"){
                        updatePage(page - 1)

                    }
                }} active={page === pageNumber} key={index}>{page}</Page>)}
            <Page onClick={()=>{
                if(pageNumber < totalPages){
                    updatePage(pageNumber)
                }
                }}  style={{background: pageNumber === totalPages ? " #A3A3A3":"#FFF",borderWidth:pageNumber === totalPages ? "0px":"1px"}} ><RightArrow color={ pageNumber === totalPages ? "#FFF" : "black" } /></Page>
        </StyledPagination>
        :
        <span></span>
    )
}
