import styled from "styled-components";


export const StylistCardStyled = styled.div`
    flex-shrink: 0;
    border-radius: 10px;
    padding:20px;
    background: #FFF;
    margin:"auto";
    box-shadow: .5px 0px 5px -3px rgba(0,0,0,0.75);
    -webkit-box-shadow: .5px 0px 5px -3px rgba(0,0,0,0.75);
    -moz-box-shadow: .5px 0px 5px -3px rgba(0,0,0,0.75);
   
    & div{
        
        & div{
        display:flex;
        padding-top:8px;
        padding-bottom:8px;
        align-items:start;
        justify-content:space-between;

        & span{
            flex:1;
            padding-left:6px;
            color: #000;
            font-size: 13px;
            cursor:pointer;
            font-style: normal;
            font-weight: 400;
            line-height: 140%; /* 22.4px */

            & h1{
                color: #000;
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                text-transform: capitalize;
            }

            & p{
                color: #590BA9;
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 12px;
                text-transform: capitalize;
            }
        }

        & button{
            width: 99px;
            height: 37px;
            flex-shrink: 0;
            border-radius: 5px;
            border: 1px solid #FF8500;
            
            color: #FF8500;
            font-style: normal;
            font-weight: 600;
            line-height: 180%; /* 32.4px */

            &:hover{
                color:white;
                background-color:#FF8500;
            }

            &:active{
                opacity:0.65;
            }
        }
    }
    }

    
`
