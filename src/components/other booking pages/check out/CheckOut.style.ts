import styled from "styled-components";
import tw from "twin.macro";


export const StyledCheckOut = styled.div`
    display:grid;
    grid-template-columns:0.5fr 1fr;
    column-gap:100px;
    padding: 40px;

    @media (max-width:820px) {
        grid-template-columns:1fr;
        row-gap:20px;
    }
`

export const COLeft = styled.div`
    margin:auto;
    h1{
        color: #000;
        text-align: start;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
    }

    h3{

        color: #332C24;
        font-size: 17px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px; /* 130.435% */
    }

 
`

export  const CheckOutForm = styled.div<{isdisabled?:"yes"|"no"}>`
        opacity: ${ props => props.isdisabled === "yes" ? 0.5 : 1};
        cursor: ${ props => props.isdisabled === "yes" ? "not-allowed" :""};
        
        label{
            display:flex;
            align-items:center;
            color: #332C24;
            /* font-size: 22px; */
            margin:10px 0;
            font-style: normal;
            font-weight: 500;
            line-height: normal;

            p{
                color: #332C24;
                font-size: 17px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
            }

            svg{
                width:24px;
                height:24px;
                margin:0 10px;
            }


        }

        h4{
            display:flex;
            width: 230px;
            justify-content:center;
            margin-top:10px;
            margin-bottom:10px;
            color: rgba(0, 0, 0, 0.40);
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;

        }

        button{
            width: 230px;
            height: 39px;
            flex-shrink: 0;
            border-radius: 5px;
            background: #FF8500;
            color: #FFF;
            cursor: ${ props => props.isdisabled === "yes" ? "not-allowed" : "pointer"};
            text-align: center;
            margin:20px 0;
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: 180%; /* 32.4px */
            ${tw` shadow-md`}

            &:active{
                border: 1px solid #FF8500;
                color: #FF8500;
                background-color:#FFF;
            }
        }
    
`

export const COButton = styled.div`
    width: 230px;
    height: 39px;
    flex-shrink: 0;
    border-radius: 5px;
    display:flex;
    margin: 20px 0;
    justify-content:center;
    align-items:center;
    border: 1px solid #FF8500;
    color: #FF8500;
    text-align: center;
    font-style: normal;
    font-size:18px;
    font-weight: 600;
    line-height: 180%;
    cursor: pointer;
`

export const CORight = styled.div`
    margin:auto;
    /* width: 400px; */
    height: 240px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid #FCEAD5;

    ${tw` md:w-[400px]`}
`

export const CORTop = styled.div`

    display:flex;
    padding:30px;

    img{
        width: 45px;
        height: 45px;
        flex-shrink: 0;
        border-radius: 60px;
        border: 3px solid rgba(255, 133, 0, 0.44);  
    }

    div{
        flex:1;
        margin-left:10px;

        data{
            display:flex;
            justify-content:space-between;
            align-items:center;

            p{
                color: #000;
                text-align: center;
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                text-transform: capitalize;
            }
        }
        span{
            color: #000;
            font-size: 15px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            text-transform: capitalize;
        }
    }

` 

export const CORText = styled.div`

    span{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin:5px 0;

        h4{
            color: #3E3E3E;
            font-size: 15px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }

        P{
            color: #3E3E3E;
            text-align: right;
            font-size: 15px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }
    }
    
    padding:0 30px 0;


`