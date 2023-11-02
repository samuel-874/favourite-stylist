import styled from "styled-components";
import tw from "twin.macro";

export const StyledCard = styled.div`
    transform: translate(calc(50dvw - 50%), calc(50dvh - 50%));

    & p{
        color: #8A8077;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-top:10px;
        margin-bottom:10px;
    }
     ${tw` fixed left-0 right-0 top-0 bottom-0 w-[45dvw] min-w-[350px] rounded-md flex flex-col justify-around items-center bg-[white] h-[400px] px-8 pt-8 pb-2 text-center text-[25px] font-[800]  z-[2]  `}
`

export const StyledCard2 = styled.div`
    transform: translate(calc(50dvw - 50%), calc(50dvh - 50%));

    svg{
        flex-shrink:0;
    }

    & p{
        color: #000;
        font-size: 17px;
        font-style: normal;
        font-weight: 500;
        line-height: 180%; /* 32.4px */
    }

    h4{
        color: #A3A3A3;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: capitalize;
    }

    form{
        width: 100%;
        padding:16px 10px;
        overflow:hidden;
        /* height: 65px; */
        align-items:center;
        display:flex;
        justify-content:space-evenly;
        flex-shrink: 0;
        border-radius: 10px;
        background: #FFF3E6;

        h6{
            margin-left:4px;
            margin-right:8px;
            white-space:nowrap;
            color: #000;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
     
        }

        h5{
            cursor: pointer;
            /* flex:1; */
            width:70%;
            color: #000;
            font-size: 13px;
            font-style: normal;
            text-align:left;
            font-weight: 500;
            text-decoration-line: underline;
        }
    }

     ${tw` fixed left-0 right-0 top-0  w-[34dvw] min-w-[350px] rounded-md flex flex-col justify-around items-center bg-[white] h-[auto] px-8 pt-8 pb-6 text-center text-[25px] font-[800]  z-[2]  `}
`



export const Bed = styled.div`
    ${tw` fixed top-0 bottom-0 bg-[rgba(0,0,0,0.5)] z-[2] left-0 right-0 `}
`

export const Loading = styled.span`
     ${tw` fixed top-0 bottom-0 bg-[rgba(0,0,0,0)] z-[1] left-0 right-0 `}
    `


export const Hambugger = styled.div`
            ${tw` w-[35px]  h-[20px] lg:hidden md:hidden  cursor-pointer rounded-md flex flex-col justify-between items-center py-[2px] items-center `}
    & span{
        background-color:black;

        ${tw` w-[80%] h-[3px] rounded-xl `}

    }
    

`

export const ItemsDiv = styled.data`
    ${tw`flex px-4 items-center py-1 lg:hidden md:hidden`}

        & a{
        ${tw` text-black p-0 m-0 mx-3 `}

        &:hover{
            color:#FF8500;
        }
        }
`

export const MenuBoard = styled.div`
       -webkit-box-shadow: -1px 0px 10px -3px rgba(0,0,0,0.75);
       -moz-box-shadow: -1px 0px 10px -3px rgba(0,0,0,0.75);
        box-shadow: -1px 0px 10px -3px rgba(0,0,0,0.75);
    ${tw`w-[200px] absolute z-[1] pt-[10px] pb-[10px]    top-[70px] right-[20px] rounded-md bg-[#FFFF] `}

    & hr{
        ${tw`my-1`}
    }

    & p{
        display:inline-block;
    }

    & div{
        ${tw`flex px-4 items-center py-1`}

          & a{
            ${tw` text-black p-0 m-0 mx-3 `}

            &:hover{
                color:#FF8500;
            }
         }

    }
        & button{
            height:35px;
            width:80px;
            background-color:orange;
            text-align:center;
            border-style:none;
            font-weight:bold;
            color:white;
            border-radius:3px;
        }
   
  
   
`

export const ProfileView = styled.a`
    height: 35px;
    width:35px;
    ${tw` bg-[#FF8500] hidden cursor-pointer  lg:inline-flex md:inline-flex text-white font-semibold text-[16px] justify-center items-center rounded-full`}
`



export const Relative = styled.div`
    position:relative;
`

export const StyledRectangle = styled.div`
    height: 90px;
    flex-shrink: 0;
    border-radius: 10px;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    background: #FFF;
    padding: 0 20px;
    max-width:400px;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    ${tw` `}
  

     div{
        display:flex;


        & p{
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            padding-left:4px;
            margin:auto 10px;
            opacity: 0.5;
            text-transform: capitalize;
            ${tw` truncate`}

        }

        & h1{
            color: #000;
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            white-space: nowrap;
            ${tw` text-[14px]  lg:text-[17px]`}
        }
    }

       span{
        color:#8A8077;
        display:flex;
        align-items:center;
        ${tw` text-[10px]  lg:text-[18px]`}


        & h2{
            color: #FBBB00;
            font-size: 13px;
            margin-left:8px;
            font-weight: 900;
            line-height: 180%;
            ${tw` lg:text-[14px] md:text-[11px] text-[11px] `}
        }

        & h5{
            color: #000;
            font-style: normal;
            font-weight: 500;
            text-transform: capitalize;
            font-size:14px;
            margin:auto 20px;
        }


    }
`

export const StyledPreview = styled.div`
    display:flex;
    background: #FFFF;
    align-items:center;
    justify-content:space-between;
    border-radius: 10px 10px 10px 10px;
    border: 1px solid rgba(232, 229, 229, 0.26);
    ${tw` h-[87px] md:h-[100px] lg:h-[100px] cursor-pointer `}



    & img{
        width: 166px;
        display:inline-block;
        border-radius: 10px 0px 0px 10px;
        ${tw` h-[87px] md:h-[100px]   `}
    }

    & p{
        color: var(--semi-black, #8A8077);
        /* font-size: 20px; */
        font-style: normal;
        font-weight: 400;
        padding-left:10px;
        line-height: 30px;
        text-overflow:hidden;
        ${tw` text-[14px] leading-tight md:text-[16px] lg:leading-[30px]  `}
    }

    & span{
        padding:8px;
        /* display:flex;
        justify-content:end; */
    }

`

export const StyledVideoCard = styled.div`
    width: 220px;
    height: 270px;
    margin:10px;
    flex-shrink: 0;
    border-radius: 10px;
    color:white;
    background: var(--white, #FFF);
    ${tw`shadow-md`}



    img{
        border-style:none;
        border-radius: 10px 10px 0px 0px;
        height:165px;
        width:100%;
    }


    p{
        height:27px;
        color: var(--curlysis-accent-purple, #590BA9);
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        padding:0;
 /* 187.5% */
    }

    span{
        padding:0;
        color: #000;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 3px;
    }

`

export const ListDisplay = styled.div`
   ${tw`sm:hidden md:inline-block`} 
`

export const Styled404Page = styled.div`
    padding-top:50px;
    height:400px;
    text-align:center;
    
    h1{
        font-size:40px;
        font-weight:900;
    }

    p{
        font-size:20px;
        font-weight:500;
    }

    a{
        font-size:20px;
        font-weight:500;

        color: #FF8500;
        font-style: normal;
        line-height: 180%; /* 28.8px */
        text-decoration-line: underline;
    }
`

export const StyledFooter = styled.footer`
        background-color:#332C24;
        display:grid;
        color:#FEF7EF;
        overflow:hidden;
        font-weight:400;


        & span{
            display:flex;
            height:45px;
            align-items:start;
            justify-content:center;
            padding-top:10px;
            font-size:14px;
            border-top: 1px solid rgba(254, 247, 239, 0.10);
        }

        & section{
            display:grid;
            grid-template-columns:1fr 1fr 1fr;
            column-gap:130px;
            padding-top:20px;
            padding-bottom:20px;

            ${tw` px-[30px] md:px-[60px]`}


            
            @media (max-width:1020px ) {
                grid-template-columns: 1fr 1fr ;
                row-gap:50px;

                & div{

                    img{
                        margin-top:10px;
                        margin-bottom:10px;
                    }

                    & div{
                         & input{
                        height:98%;
                    }
                    }
                    
                   
                }
            }

            
            @media (max-width:580px ) {
                grid-template-columns: 1fr;
                row-gap:50px;
            }






            


            & h1{
               font-size:18px;
               margin-bottom:10px;
            }

            & h2{
               font-size:13px;
               font-weight:300;
               margin-bottom:8px;
            }

        
            & p, a{
                font-size:13px;
                font-weight:lighter;
            }

            & a{
                color:#FF8500;
                display:block;
                line-height: 20.4px; /* 138.571% */
                text-decoration-line: underline;
                text-decoration-thickness: 0.5px;
            }


        }

`

export const DivInput = styled.div`
           height:40px;
           width:100%;
           display:flex;
           & img{
               margin-top:10px;
               margin-bottom:10px;
           }

           & button{
               background-color:#FF8500;
               
               height:40px;
               flex:0.4;
               max-width:60px;
               padding-left:6px;
               padding-right:6px;
               border-style:none;
               border-radius:4px;
               margin-left:-40px;
               white-space:nowrap;
               text-overflow:"hidden";
               ${tw` md:w-[60px]`}
           }

           & input{
               height:35px;
               color:black;
               padding-right:35px;
               padding-left:10px;
               height:99%;
               flex:1;
               /* width:100%; */
               border-radius:4px;

               &:focus{
                   outline:none;
               }
           }

`

export const StyledFilter = styled.div`
    font-feature-settings: 'clig' off, 'liga' off;
    width: 30dvw;
    min-width:250px;
    /* height: 90dvh; */
    flex-shrink: 0;
    background: #FFF;
    padding:20px;
    padding-bottom:40px;
    position:fixed;
    top:0;
    right:0;
    z-index:3;

    h3{
        color: rgba(122, 128, 126, 0.53);
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 166%;
        letter-spacing: 0.4px;
        margin:10px 0;
    }
    
    p{
        color: #000;
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        line-height: 143%; /* 22.88px */
        letter-spacing: 0.15px;
    }


    div{
        margin:15px 0;

        select{
            padding: 0 10px;
            border-radius: 4px;
            border: 1px solid #E1E5E4;
            background: rgba(225, 229, 228, 0.20);
            width:100%;
            height: 35px;
            flex-shrink: 0;

            color: #7A807E;
            font-size: 14px;
            font-weight: 400;
            line-height: 143%; /* 20.02px */
            letter-spacing: 0.15px;
        }

        data{
            display:flex;

            p{
                color: #000;
                font-feature-settings: 'clig' off, 'liga' off;;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 166%;
                letter-spacing: 0.4px;
                margin:0 5px;
            }
        }

    }


    button{
        border-radius: 4px;
        border: 1px solid #590BA9;
        width: 100%;
        height: 35px;
        margin:20px 0;
        

        color: #590BA9;
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 157%; /* 21.98px */
        letter-spacing: 0.1px;
    }

`


