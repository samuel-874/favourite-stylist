import styled from "styled-components"
import tw from "twin.macro";

export const StyledBookingsCard = styled.div`
    padding:16px;
    height:268px;
    min-width:310px;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 10px 40px 10px rgba(0, 0, 0, 0.1);
`

export const BCTop = styled.div`
    display:flex;
    align-items:center;

    p{
        color: #000;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
        white-space:nowrap;
    }

    span{
        margin-left:10px;
        color: #A3A3A3;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: capitalize;
        ${tw` truncate`}
    }
`

export const BCSect1 = styled.div`
    display:flex;
    align-items:center;
    margin-top:16px;

    p{
        margin-left:10px;
        color: #000;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: capitalize;
    }

  
`

export const BCStatus = styled.div<{color?:string}>`
    display:flex;
    align-items:center;

    span{
        width: 10px;
        height: 31px;
        flex-shrink: 0;
        border-radius: 15.5px;
        background: ${({color}) => color || "#FBBB00"};
        display:inline-block;
    }

    h4{
        margin-left:10px;
        color: ${({color}) => color || "#FBBB00"};
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height: 180%; /* 27px */
    }
`

export const BCSect2 = styled.div`
    display:flex;
    align-items:center;
    margin-top:55px;


    p{
        color: #000;
        font-size: 16px;
        font-style: normal;
        font-weight: 400; 
    }

    span{
        color: #000;
        font-size: 20px;
        font-style: normal;
        font-weight: 800;
        margin-left:10px;
    }
    
`

export const BCBottom = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:20px;


    button{
        width: 80px;
        height: 37px;
        flex-shrink: 0;
        border-radius: 5px;
        border: 1px solid #FF8500;
        color: #FF8500;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        background: #FFFF;

        &:hover{
            color:white;
            background:#FF8500;

        }
        &:active{
            opacity:0.8;
        }

    }

    span{
        color: #A3A3A3;
        text-align: right;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        text-transform: capitalize;
    }
`


export const StyledOrders =  styled.div`
    position:fixed;
    overflow-y:scroll;
    width:36dvw;
    min-width:300px;
    background: #FFF;
    z-index:3;
    top:0;
    right:0;

    svg{
        flex-shrink:0;
    }


    ${tw` w-[50dvw] md:w-[35dvw] p-[20px 20px] md:p-[10px  2dvw 10px]  `}

    hr{
        margin: 10px 0;
        height: 1px;
        color: #FCEAD5 !important;

        ${tw`m-[20px 0] md:m-[10px 0]`}
    }
`

export const OCTop = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    white-space: nowrap;
    flex-wrap:wrap;


    p{
        color: #000;
        font-style: normal;
        font-weight: 700;
        line-height: 140.625%;
        text-transform:capitalize;

        ${tw` text-[16px] md:text-[18px]`}
    }

    a{
        color: #FF8500;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
        text-decoration-line: underline;
        cursor:pointer;
        ${tw` text-[14px] md:text-[16px]`}

    }
`

export const OCSec1 = styled.div`
    display:flex;
    margin-top:10px;

    img{
      width: 35px;
        height: 35px;
        flex-shrink: 0;
        border-radius: 35px;
        border: 1.6px solid #590BA9;
        background: lightgray ;
        display:inline-block;
    }

    svg{
        width:15px;
        height:15px;
           flex-shrink: 0;
    }

    div{
        flex:1;
        padding-left:10px;

         p{
            width: 139px;
            color: #000;
            font-size: 16px;
            font-weight: 500;
            line-height: normal;
            text-transform: capitalize;
            padding-bottom:10px;
        }

        span{
            display:flex;
            justify-content:start;

            h4{
                padding-left:8px;
                color: #000;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                min-width:200px;
            }
        }
    }
`

export const OCSect2 = styled.div`
        div{
            display:flex;
            color: #000;
            font-size: 15px;
            font-style: normal;
            font-weight: 500;
            text-transform: capitalize;
            margin:3px 0;

            span{
                margin-right:10px;
            }

            h5{
                color: #000;
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
            }

        }
`

export const MeetingLink = styled.div`
    width: 100%;
    margin:auto;
    padding:10px;
    border-radius: 10px;
    background: #FFF3E6;
    overflow:hidden;
    display:flex;
    justify-content:space-between;

    

    span{
        color: #000;
        font-size: 12.5px;
        font-style: normal;
        font-weight: 600;
        padding:0;
        padding-left:6px;
        margin:0;
        white-space:nowrap;
    }

    p{
        color: #000;
        font-size: 12px;
        font-weight: 600;
        height:30px;
        text-decoration-line: underline;
        margin: auto 0 auto 5px;

        cursor:pointer;

        &:hover{
            opacity:0.5;
        }
        &:active{
            opacity:1;
        }
    }
`

export const OCSect4 = styled.div`
    display:flex;
    align-items:center;
    font-size:15px;
    font-weight:500;
    ${tw`py-[10px] `}



    div{
        flex:1;
        display:flex;
        justify-content:space-around;
        align-items:center;

        span{
            img{
                width:25px;
            }
            p{
                color: #A3A3A3;
                font-size: 10px;
                font-style: normal;
                font-weight: 400;
                line-height: 180%; 
            }
        }
    }
`

export const OCSect5 = styled.div`

    p{
        flex-shrink: 0;
        color: #000;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    textarea{
        width: 100%;
        padding:10px;
        height: 90px;
        flex-shrink: 0;
        border-radius: 5px;
        resize:none;
        border: 1px solid #EEE;
        background: #FBFBFB;
    }
`

export const Buttons = styled.div`
    display:flex;
    justify-content:space-between;
    column-gap:10px;
    ${tw` sm:mt-[10px] md:py-0`}

    div{
        display:flex;
        justify-content:center;
        align-items:center;
        width:45%;
        height: 40px;
        flex-shrink: 0;
        border-radius: 5px;
        background: #FF8500;
        color: #FFF;
        text-align: center;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 180%;
        cursor:pointer;

        &:active{
           background: #FFF;
           color: #FF8500;
           border:1px solid #FF8500;
        }
    }

    span{
        width:45%;
        display:flex;
        justify-content:center;
        align-items:center;
        height: 40px;
        flex-shrink: 0;
        border-radius: 5px;
        border: 1px solid #FF8500;
        color: #FF8500;
        text-align: center;
        font-size: 17px;
        font-style: normal;
        font-weight: 600;
        line-height: 180%;
        cursor: pointer;
    }
`

    /* Services  */

    export const StyledServices =  styled.div`
    position:fixed;
    overflow-y:scroll;
    /* width:50dvw; */
    padding: 10px 0  20px;
    min-width:300px;
    background: #FFF;
    z-index:3;
    top:0;
    right:0;


    ${tw` w-[90dvw] md:w-[50dvw] lg:w-[38dvw] `}

    hr{
        height: 1px;
        color: #FCEAD5 !important;

        ${tw`m-[20px 0] md:m-[10px 0]`}
    }
`
type IsSelected ={
    isselected?:string
}


export const ServiceRec = styled.div<IsSelected>`
    display:flex;
    justify-content:space-between;
    background: ${ props => props.isselected  === "yes" ? "#eae4e4" : ""};
    padding:2px 2dvw;

    img{
        width: 50px;
        height: 80px;
        flex-shrink: 0;
        border-radius: 55px;
    }

    div{
        padding-left:12px;

        span{
                display:flex;
                justify-content:space-between;
                height:20px;


                p{
                    color: #000;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 600;
                    text-transform: capitalize;
                    white-space:nowrap;
                }

                h4{
                    color: #FF8500;
                    font-size: 15px;
                    font-style: normal;
                    font-weight: 600;
                    text-transform: capitalize;
                }
            }

        data{
            color: rgba(0, 0, 0, 0.35);
            font-size: 13.4px;
            font-weight: 500;
            text-transform: capitalize;
            /* ${tw`leading-tight`} */

        }
        h4{
            /* width: 439px; */
            color: #332C24;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            letter-spacing: -0.03em;
            line-height:1.25;
        }
    }

`

export const SCText = styled.div`
        color: #590BA9;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-transform: capitalize;
        padding: 0 2dvw 10px;
`