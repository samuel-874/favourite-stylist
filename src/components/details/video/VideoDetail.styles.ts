import styled from "styled-components";
import tw from "twin.macro";


export const StyledVideo = styled.div`
    padding:20px;
    padding-bottom:40px;
    display:flex;
    justify-content:space-around;
    row-gap:40px;
    ${tw` sm:flex-col lg:flex-row`}
    
    iframe{
        border-radius:10px;
        ${tw` sm:w-[100%] lg:w-[560px]`}
        
    }

    section{
        border: 1px solid black;
        padding:10px;
        width:440px;
        border-radius:4px;

        form{
            display:flex;
            padding:4px;
            align-items:center;
        }

        input{
            margin:2px;
            flex:1;
            background-color:transparent;
            height:35px;
            padding: 0 10px;
            margin-left:auto;
            margin-right:auto;
        }

        p{
            display:inline-block;
            font-size:14px;
            margin: 0 6px;
        }

        span {
            display:flex;
            align-items:center;
            margin: 4px 5px;

            span{
                display:flex;
                align-items:start;
                flex-direction:column;

                h4{
                    margin-left:5px;
                    font-size:10px;
                    color:gray;
                }

            }
            
            div{
                height:30px;
                width:30px;
                border-radius:30px;
                background: green;
                display:inline-flex;
                font-size:14px;
                color:white;

                justify-content:center;
                align-items:center;
            }

        }

        button{
            height:33px;
            width:60px;
            margin:0 6px;
            border-style:none;
            border-radius:15px;
            background: black;
            color:white;
        }
    }

`

export const VidTitle = styled.p`
    font-family: 'Martel Sans', sans-serif;
    font-weight:1000;
    margin-top:10px;
    margin-left:auto;
`