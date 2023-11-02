import styled from "styled-components";
import tw from "twin.macro";

export const StyledCalender = styled.div`
    padding:20px 0;
    position:fixed;
    z-index:3;
    height:80dvh;
    top:0;
    /* bottom:0; */
    left:0;
    right:0;
    border-radius: 10px;
    background: #FFF;
     transform: translate(calc(50dvw - 50%), calc(50dvh - 50%));

     display:grid;
     grid-template-columns: 0.7fr 0.01fr 1fr;
    ${tw` w-[80dvw] top-[20px] md:top-0 h-[auto] lg:w-[70dvw]`}
     @media (max-width: 1020px) {
        grid-template-columns: 1fr;

     }

     h1{
        color: #000;
        font-size: 19px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-transform: capitalize;
     }
`

export const LineThrough = styled.div`
    width: 1px;
    height: 100%;
    background: rgba(255, 133, 0, 0.29);

    ${tw` hidden lg:inline-block`}
`

export const LineUnder = styled.div`
    height: 1px;
    width: 100%;
    background: rgba(255, 133, 0, 0.29);

    ${tw` lg:hidden`}
`



export const CSLeft = styled.div`
        padding:20px;
        ${tw` hidden md:inline-block`}

        data{
            display:flex;
            align-items:center;

            h3{
                
                color: #7D7D7D;
                font-size: 17px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                text-transform: capitalize;
                white-space:nowrap;
            }

            div{
                width:40px;
                margin-left:10px;
                display:inline-flex;
                justify-content:space-between;
            }
        }

        span{
            display:flex;
            align-items:start;
            margin:10px 0;

            p{
                color: #000;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 140%;
                margin-left:5px; 
            }

            svg{
                width:18px;
                height:18px;
                margin-top:3px;
                flex-shrink:0;
            }
        }
` 

export const CSRight = styled.div`
    ${tw` p-[10px] lg:p-[20px]`}

    data{

        display:flex;
        justify-content:space-between;
        align-items:start;
        span{
            display:inline-flex;
            justify-content:space-between;
            align-items:center;
            width:65px;


        }
    }

    h1{
        margin-bottom:20px;
    }
 
`

export const NavArrow = styled.div<{isdissabled?:"yes"|"no"}>`
                display:flex;
                justify-content:center;
                align-items:center;
                border-radius:40px;
                height:30px;
                width:30px;
                color: ${props => props.isdissabled === "yes" ? "lightgray" :"black" };
                cursor: pointer;

                &:hover{
                    background: ${props => props.isdissabled === "yes" ? "" :"lightgray"} ;
                }
`

export const Time = styled.div<{isselected?:"yes"|"no"}>`
    width: 120px;
    height: 40px;
    flex-shrink: 0;
    margin:8px 0;
    border-radius: 5px;
    border: 1px solid #FF8500;
    color: ${ props => props.isselected === "yes" ? "#FFF" : "#FF8500" };
    background: ${ props => props.isselected === "yes" ? "#FF8500" : "#FFF" };
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    text-align: center;
    line-height: 180%;
    cursor: pointer;
    
`

export const CSBoard = styled.div`
    display:grid;
    grid-template-columns:1fr 0.7fr;
    column-gap:30px;
    padding-bottom:15px;

    ${tw` grid-cols-1 lg:grid-cols-[1fr 0.7fr]`}


    h2{
        color: #222;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px;
        text-transform:capitalize;
    }

`

export const Dates = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    column-gap:10px;
    row-gap:10px;

    div{
        color: #AAA;
        font-family: 'Franklin Gothic Medium';
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 12px;
        letter-spacing: 0.3px;
        text-transform: uppercase;
    }

 
`

export const DateNum = styled.span<{iscurrent?:"yes"|"no",isselected?:"yes"|"no",}>`
        color: ${ props => props.iscurrent === "yes" || props.isselected === "yes" ? "#FFF" : "rgba(34, 34, 34, 0.41)" };
        border-radius: 106px;
        background: ${ props => props.isselected === "yes" ? "#FF8500" :( props.iscurrent === "yes" ? "rgb(203 213 225/ 1)":"")};
        text-align: center;
        display:flex;
        justify-content:center;
        align-items:center;
        font-family: 'Franklin Gothic Medium';
        flex-shrink:0;
        height:26px;
        width:26px;
        cursor: pointer;
        font-size: 13px;
        font-style: normal;
        font-weight: 300;
        line-height: 22px; /* 157.143% */

        &:hover{
            background: ${ props => (props.iscurrent  !== "yes" && props.isselected !== "yes" )? "lightgray" :""};
        }
`

export const Bottom = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;

    div{
        select{
          padding:5px 10px;
          height: 30px;
          flex-shrink: 0;
          border-radius: 20px;
          background: #F4F4F4;
          color: #222;
          font-size: 13px;
          font-style: normal;
          font-weight: 500;
          line-height: 22px; /* 157.143% */
        }
    }
`

export const Times = styled.div`
    ${tw` flex justify-between flex-wrap lg:inline-block`}
`

export const CSButtons  = styled.div<{isdissabled?:"yes"|"no"}>`
    display:flex;
    justify-content:space-between;
    column-gap:10px;
    margin-top:20px;
    position:relative;

    data{
        background: red;
        min-height:24px;
        min-width:30px;
        color:white;
        position:absolute;
        border-style:none;
        border-radius:4px;
        padding:4px;
        top:-40px;
        right:0;
        font-size:14px;
        font-weight:500;


    }


    div,button{
        display:flex;
        justify-content:center;
        align-items:center;
        width:50%;
        height: 35px;
        flex-shrink: 0;
        border-radius: 5px;
        background: #FF8500;
        color: #FFF;
        text-align: center;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 180%;
        cursor: ${ props => props.isdissabled === "yes" ? "not-allowed" : "pointer"};
        opacity: ${ props => props.isdissabled === "yes" ? 0.5 : 1 };

        &:active{
            background: #FFF;
           color: #FF8500;
           border: 1px solid #FF8500;
        }

    }

    span{
        width:50%;
        display:flex;
        justify-content:center;
        height: 35px;
        border-radius: 5px;
        border: 1px solid #FF8500;
        color: #FF8500;
        align-items:center;
        font-size: 17px;
        font-style: normal;
        font-weight: 600;
        flex-shrink: 0;
        line-height: 180%;
        cursor: pointer;

        
        &:active{
            opacity:0.5;
        }
    }
`