import styled from "styled-components";
import tw from "twin.macro";


export const StyledDetails = styled.div`
    padding:4dvw;
`

export const Topic = styled.div`

    div{
        display:grid;
        padding-left:5dvw;
        padding-right:5dvw;
        align-items:center;
        justify-content:space-around;
        flex-direction:column;
        font-family: 'Martel Sans', sans-serif;
        ${tw` `}
    p{
        
        font-size:36px;
        font-weight:1000;
        line-height:1.3;
        letter-spacing:-0.014rem;
        ${tw` text-[23px] md:text-[27px] lg:text-[36px] `}

    }

    span{
        padding:10px 0;
        display:flex;
        align-items:center;
        justify-content:start;
        flex-direction:row;
        
        img{
         
            width:40px;
            height:40px;
            border:2px solid #590BA9;
            border-radius:200px;
        }

        h4{
            font-weight:600;
            font-size:16px;
            margin-left:10px;
            margin-right:10px;

        }
    }
    }
   

`

export const Content = styled.div`
    h1{
        font-size:30px;
        font-weight:1000;
        font-family: 'Martel Sans', sans-serif;

    }
    font-weight:500;
    font-size:15px;
    padding:5dvw;
    
`