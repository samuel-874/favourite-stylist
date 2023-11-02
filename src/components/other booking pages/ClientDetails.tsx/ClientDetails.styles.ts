import styled from "styled-components";
import tw from "twin.macro";

export const StyledClientDetails = styled.div`
    flex-shrink: 0;
    background: #F4F4F4;
    padding:40px 10dvw;
`

export const CDTop = styled.div`
    display:flex;
    justify-content:space-between;

    @media (max-width: 650px) {
        flex-direction:column-reverse;
    }

    

    h3{
        color: #000;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        height: 35px;
        flex-shrink: 0;
    }

    p{
        color: #FF8500;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        text-decoration-line: underline;
        height: 28px;
        flex-shrink: 0;
        ${tw` text-[13px] md:text-[14px]`}

    }
`

export const CDInputs = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr;
    column-gap:40px;
    row-gap:20px;

    @media (max-width: 650px) {
        grid-template-columns:1fr;
    }


    span{

        p{
          color: rgba(0, 0, 0, 0.51);
          font-size: 15px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
        
       input{
        width:100%;
        height:34px;
        border-radius: 5px;
        border: 1px solid #EEE;
        background: #FFF;
        padding:20px;
        font-size:14px;
        font-weight:600;
      }

      data{
        color:rgb(239 68 68/1);
        margin-left:8px;
        font-size:14px;
      }
    }
`

export const CDHeading = styled.h1`
        color: #000;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        height: 35px;
        flex-shrink: 0;
`

export const CDButton = styled.button`
    margin: 40px auto;
    width: 200px;
    height: 38px;
    flex-shrink: 0;
    border-radius: 5px;
    background: #FF8500;
    color: #FFF;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 180%; /* 32.4px */
    cursor: pointer;

    &:active{
        border: 1px solid #FF8500;
        background: #FFF;
        color: #FF8500;
    }
`

export const Hr = styled.div`
    width: 100%;
    height: 0.5px;
    background: rgba(255, 133, 0, 0.47);
    margin-top:60px;
    margin-bottom:40px;

`