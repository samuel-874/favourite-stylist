import styled from "styled-components";
import tw from "twin.macro";


export const StyledShort = styled.div`
        background-color:white;
        position:fixed;
        padding:16px;
        ${tw` top-0 w-[80dvw] md:w-[410px]  right-0 z-[2]  `}

        metadata{
            height:auto;
            display:flex;
            flex-direction:column;
            padding:7px 0;

            svg{
                width:17px;
                height:17px;
            }


            div{
                display:flex;
                align-items:center;
                justify-content:space-between;

                data {
                    display:flex;
                    width:220px;
                    justify-content:start;


                    p{
                        white-space:nowrap;
                        color: #000;
                        text-align: center;
                        font-size: 20px;
                        font-style: normal;
                        font-weight: 900;
                        line-height: normal;
                        text-transform: capitalize;
                    }

                    img{
                        margin-left:8px;
                        width:20px;
                        height:26px;
                    }
                }
            }

        }

        span{
            display:flex;
            width:170px;
            justify-content:space-between;
            
            span{
               width:100px;
               justify-content:space-around;
            }

            h5{
                color: rgba(0, 0, 0, 0.63);
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                white-space:nowrap;
                line-height: 180%;
                text-decoration-line: underline;
            }

        }
`

export const ShortBed = styled.div`
       position:fixed;
       cursor:pointer;
        ${tw` top-0 left-0 right-0 bottom-0 z-[1] bg-[rgba(0,0,0,0.3)] `}
`

export const ProfilePic = styled.img`
    border-radius: 100px;
    border: 1px solid #590BA9;
    height:50px;
    width:50px;
`

export const StyledSection = styled.div`
    display:flex;
    justify-content:space-between;
    /* align-items:start; */
    padding: 6px 0;
    height:90px;

    img{
        border: 2px solid #590BA9;
        border-radius:100px;
        width:60px;
        height:60px;
        flex-shrink:0;
    }

    p{
        padding: 0 4px;
        text-align:left;
        color: rgba(0, 0, 0, 0.63);
        font-size: 13px;
        font-style: normal;
        width:80%;
        font-weight: 500;
        line-height: 130%;
        overflow: hidden;
            text-overflow: ellipsis;
    }

`

export const BoardCredentials = styled.div`
    width: 96%;
    margin:auto;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    height: 140px;
    flex-shrink: 0;
    border-radius: 5px;
    background: #F4F4F4;
    padding-top:7px;

    span{
        display:flex;
         width:100%;
         align-items:center;
         justify-content:start;

        p{
           color: #000;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 24px; /* 133.333% */
            ${tw` `}
        }

        svg{
            margin-left:10px;
            margin-right:10px;
            flex-shrink:0;
            width:15px;
        }
    }
`

export const Gallery = styled.div`
            padding-top:10px;
            min-height:100px;
            padding-bottom:10px;

    span{
        display:flex;
        justify-content:space-between;
        align-items:center;
        width:100%;
        padding-bottom:10px;

        h3{
            color: #000;
            text-align: center;
            font-size: 19px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            text-transform: capitalize;
        }

        h4{
            color: #000;
            text-align: left;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            text-transform: lowercase;
            opacity: 0.5;
        }
    }

    div{
        display:flex;
        justify-content:space-between;

        img{
            width:89px;
            height:89px;
            flex-shrink: 0;
            border-radius:14px;
        }
    }
`

export const Bottom = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;

    p{
        color: #590BA9;
        font-size: 14px;
        font-style: normal;
        cursor:pointer;
        font-weight: 400;
        line-height: 180%;
        text-decoration-line: underline;
    }

    button{
        width: 79px;
        height: 35px;
        flex-shrink: 0;
        color: #FF8500;
        border-radius: 5px;
        border: 1px solid #FF8500;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 180%; /* 32.4px */

        &:hover{
            background: #FF8500;
            color:white;
        }

        &:active{
            opacity: 0.8;
        }
    }

`


/*  stylist details page styles */

export const TopBoard = styled.div`
    height:10dvh;
    background: #590BA9;
    flex-shrink:0; 
`

export const TopSect = styled.div`
    min-height:290px;
    position:relative;
    border-radius: 0px 0px 10px 10px;
    background: #FFF7EE;
    padding:40px 30px;
`

export const StylistPic = styled.img`
    margin-bottom:10px;
    width: 60px;
    height: 60px;
    position:absolute;
    top:-30px;
    border-radius: 100px;
    border: 2px solid #590BA9;
    flex-shrink: 0;
    display:block;
`

export const ColumnContainer = styled.div`
    display:grid;
    grid-template-columns: 1fr;
    

    section{
        height:200px;
      

        div{
            display:flex;
            justify-content:space-between;
            align-items:center;
            img{
                height:28px;
                width:24px;
                margin:0 8px;
            }

            h2{
                color: #000;
                text-align: center;
                font-size: 24px;
                font-style: normal;
                font-weight: 700;
                text-transform: capitalize;
            }

            p{
                color: rgba(0, 0, 0, 0.40);
                font-size: 15px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                text-transform: capitalize;
                margin:auto;
            }
            
            div{
                display:block;
                h3{
                    margin-top:20px;
                    color: #000;
                    font-size: 17px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 24px; 
                }

                div{
                    display:flex;
                    justify-content:space-between;

                    span{
                        border-radius: 10px;
                        border: 1px solid #FF8500;
                        background: #FFFAF5;
                        padding: 4px 8px;
                        flex-shrink:0;
                        color: #FF8500;
                        font-size: 15px;
                        font-style: normal;
                        font-weight: 500;
                        margin:6px;
                        line-height: 24px;
                    }
                }
            }
        }

        data{
            color: rgba(0, 0, 0, 0.63);
            margin-top:15px;
            font-size: 15px;
            font-style: normal;
            font-weight: 500;
            line-height: 120%;
        }

        span{
            margin-top:10px;
            display:flex;
            justify-content:start;
            align-items:center;

            p{
               color: #000;
               font-size: 15px;
               font-style: normal;
               font-weight: 500;
               line-height: 24px; 
               margin:0 8px;
            }

        }


    }


    ul{
        div{
            display:flex;
            align-items:center;

            img{
                margin:10px;
                width:24px;
                cursor:pointer;
            }
        }
    }


    @media (min-width: 820px) {
        grid-template-columns: 1fr 0.8fr;
        column-gap:200px;
    }

`

export const MainGallery = styled(Gallery)`
    padding:50px;
    min-height:250px;

    span{
        h4{
            color: #FF8500;
            cursor: pointer;

            &:hover{
                text-decoration-line: underline;
            }
        }
    }

    div{

        flex-wrap:wrap;

        img{
            width: 190px;
            height: 190px;
            flex-shrink: 0;
            margin-top:25px;
            border-radius: 20px;
        }
    }

`

export const ReviewSection = styled.div`
    padding: 35px 50px 50px 50px;
    span{
        display:flex;
        justify-content:space-between;
        align-items:center;
        width:100%;
        padding-bottom:8px;

        h3{
            color: #000;
            text-align: center;
            font-size: 19px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            text-transform: capitalize;
        }

        h4{
            text-align: left;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            text-transform: lowercase;
            opacity: 0.5;
            color: #FF8500;
            cursor: pointer;
            &:hover{
                text-decoration-line: underline;
            }
        }
    }
`



export const Review = styled.div`
    display:flex;
    margin-top:20px;
    margin-bottom:20px;
    max-width:670px;
    height:60px;
    /* background: orange; */

    span{
        width: 35px;
        height: 35px;
        margin: 0 10px;
        flex-shrink: 0;
        display:flex;
        align-items:center;
        justify-content:center;
        background-color: #FF8500;
        border-radius:100px;
        color: #FFF;
        font-size: 18px;
        font-weight: 600;
        text-transform: uppercase;
        padding:0;

    }

    div{
        flex:1;
        display:flex;
        flex-direction:column;
        justify-content:space-between;

        div{
            display:flex;
            flex-direction:row;
            justify-content:space-between;

            h4{
                color: #454545;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 24px; /* 120% */
                opacity: 0.8;
            }

            p{
                font-size: 15px;
                font-style: normal;
                font-weight: 500;
                line-height: 150%; /* 30px */
            }
        }
    }

`