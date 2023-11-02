import styled from "styled-components";
import tw from "twin.macro";
import { CardProps } from "../../types/appTypes";

export const StyledHome = styled.div`
    padding-top:50px;
`

export const Greating = styled.div`
    color: var(--curlysis-accent-purple, #590BA9);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 180%;
    padding-left:40px;
    padding-right:40px;

    & p{
       color: #000;
       font-size: 25px;
       font-style: normal;
       font-weight: 800;
       line-height: 140.625%;
    }

    & h4{
        color: #7E7E7E;
        width: 60dvw;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height:110%;
    }
`

export const SearchBar = styled.form`
    height:45px;
    padding:8px;
    display:flex;
    flex:1;
    /* margin-left:10px;
    margin-right:10px; */
    border-radius:5px;
    border-style:none;
    align-items:center;
    background: #F4F4F4;
    justify-content:space-between;
    ${tw` shadow-sm`}
    & input { 
        flex:1;
        margin-left:10px;
        margin-right:10px;
        background-color:transparent;
        color:#000;
    }

    & button{
        border-style:none;
        border-radius:4px;
        padding: 3px 12px;
        background-color:#FF8500;
    }

    svg{
        cursor: pointer;
    }

`

export const Page = styled.div`
        padding-top:10px;

        ::-webkit-scrollbar {
            display: none;
            }
`

export const TopSection = styled.div`
          display:block;
          padding-top:10px;
          padding-bottom:10px;
          letter-spacing: -0.05em;
  & h1{
        color: #000;
        font-size: 20px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        text-transform: capitalize;
        ${tw` sm:text-[18px] `}
    }

    & strong{
        color: #FF8500;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    & h2{
        color: var(--semi-black, #8A8077);
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    & span{
        display:flex;
        justify-content:space-between;
        align-items:center;

        & h3{
            cursor: pointer;
            display:inline-block;
              color: #FF8500;
            font-size: 14px;
            font-weight: 600;
            font-style: normal;
            line-height: normal;
        }
    }

    & h5,a{
        color: #FF8500;
        font-size: 14px;
        font-weight: 600;
        position:absolute;
        font-style: normal;
        line-height: normal;
        ${tw` lg:top-[10px] md:top-[10px] right-[50px] h-[30px] cursor-pointer bottom-0 `}
    }
`



export const CardSection = styled.section<CardProps>`
    display:grid;
    column-gap:30px;
    min-height:270px;
    padding-top:10px;
    padding-bottom:30px;
    padding-left:40px;
    padding-right:40px;
    justify-content:space-between;
    background-color: ${ props => props.color && props.color};

    @media (min-width: 1020px) {
        grid-template-columns: ${ props => props.layout === "list" ? "repeat(1, minmax(0, 1fr))" : "1fr 1fr 1fr"};
    }

    @media (max-width: 1020px ) {
        grid-template-columns: repeat(1, minmax(0, 1fr)) ;
    }
    
    ${tw` gap-y-[30px] gap-x-[70px] `}
    `

export const MiddleSection = styled.section`
    min-height:600px;
    display:grid;
    row-gap:50px;
    background-color:#FEF7EF;

    @media (min-width: 1020px) {
        column-gap:150px;
        grid-template-columns: 0.8fr 1fr;
    }

    ${tw` grid-cols-1  px-[30px] md:px-[50px] py-[30px] `}
`

export const Bar = styled.div`
    width: 10px;
    height: 31px;
    flex-shrink: 0;
    border-radius: 15.5px;
    background: #FBBB00;
`

export const SectionLeft = styled.div`

`

export const GridLayout = styled.div`
    display:grid;
    grid-template-columns:1fr;
    row-gap:20px;
     column-gap:30px;
    ${tw` md:grid-cols-2 pt-3  lg:grid-cols-1 `}

    @media (max-width:906px) {
        grid-template-columns:1fr;
    }

`

export const VidSection = styled.section`
    display:grid;
    min-height:300px;
    padding-top:40px;
    padding-bottom:40px;

    @media (min-width: 1020px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: 580px) and (max-width: 1020px) {
        grid-template-columns: 1fr 1fr ;
    }

    @media (min-width: 300px ) and (max-width: 580px) {
        grid-template-columns: 1fr;
    }


    ${tw` px-[30px] md:px-[50px]`}
`

export const Section = styled.div`
    min-height:300px;
    padding-top:40px;
    padding-bottom:40px;
 ${tw` px-[30px] md:px-[50px]`}
 `

export const ScrollView = styled.div`
    display: grid;
    overflow-x: scroll;
    column-gap:30px;
    grid-template-columns: repeat(3,450px);
    grid-auto-flow: column;

    div{
        height:100px;
        img{
            height:100px;
        }
    }
`

export const BarSection = styled.div`
    display:flex;
    margin-top:10px;
    margin-bottom:40px;  
    margin-left:30px;  
    margin-right:30px; 
    
    ${tw` flex-col md:flex-row`}

    span{
        display:flex;
        justify-content:end;
        align-items:center;
        ${tw` mt-[20px] md:mt-0 `}
        button{
                border:1px solid #CCCCCC;
                border-radius:5px;
                width:45px;
                height:31px;
                margin:2px;
            }
    }

 
`

