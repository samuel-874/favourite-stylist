import styled from "styled-components";
import tw from "twin.macro";


export const OSTop = styled.div`
    padding:40px;

    h1{
        color: #000;
        font-size: 21px;
        font-style: normal;
        font-weight: 700;
        text-transform: capitalize;
    }

    h3{
        color: rgba(0, 0, 0, 0.46);
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }

    p{
        margin-top:20px;
        color: #332C24;
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
    }
`

export const OrderStylistStyled = styled.div`
    padding:0 40px;
`

export const OSInputs = styled.div`
    display:grid;
    grid-template-columns:1.5fr 1fr;
    column-gap:30px;

    @media (max-width:620px) {
        grid-template-columns:1fr;
        row-gap:30px;
    }

    div{
        p{
            font-size:15px;
            font-weight:500;
            color: rgba(0, 0, 0, 0.51);
            font-style: normal;
            font-weight: 500;
            height: 26px;
            flex-shrink: 0;
        }
     }
`

export const OSInput = styled.div`
    height:40px;
    padding:14px 8px;
    display:flex;
    flex:1;
    /* margin-left:10px;
    margin-right:10px; */
    border-radius:5px;
    border-style:none;
    align-items:center;
    background: #F4F4F4;
    justify-content:space-between;
     ${tw`shadow-sm`}
    & input { 
        flex:1;
        margin-left:10px;
        margin-right:10px;
        background-color:transparent;
        color:#000;
        font-size:15px;


    }

    button{
        border-style:none;
        border-radius:4px;
        padding: 2px 10px;
        background-color:#FF8500;
    }

    svg{
        cursor: pointer;
    }


`

export const OSStylistSection = styled.div`
    padding-top:50px;

    h2{
        padding-left:4px;
        font-size:18px;
        font-weight:600;
    }

`

export const OSBottom = styled.div`
    display:grid;
    justify-content:space-between;
    align-items:start;
    flex-wrap:wrap;
    column-gap:30px;
    row-gap:30px;
    padding-bottom:100px;

    ${tw` grid-cols-1  lg:grid-cols-3`}



`

export const ServiceCard = styled.div`


    display:inline-block;
    padding:20px 20px 40px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);
    
    h3{
        color: #000;
        font-size: 20px;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
    }

    h4{
        color: #000;
        font-size: 15px;
        font-weight: 700;
        margin-top:15px;
        line-height: normal;
        text-transform: capitalize;
    }
    
    p{
        color: var(--curlysis-textcolor, #332C24);
        font-size: 14px;
        font-style: normal;
        margin-top:10px;
        font-weight: 400;
        line-height: 22px; /* 137.5% */
    }

`

export const OSButton  = styled.div`
    width: 230px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 5px;
    display:flex;
    justify-content:center;
    align-items:center;
    background: #FF8500;
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 180%; /* 32.4px */
    text-align:center;
    margin: 30px auto;

    &:hover{
      
    }

    &:active{
        background: white;
        border:1px solid #FF8500;
        color: #FF8500;
    }
`

export const OSParagraph = styled.div`
    color: #000;
    flex-shrink: 0;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    text-align:left;
    margin-top:20px;
    margin-left:4px;
    margin-bottom:20px;
    line-height: normal;
`