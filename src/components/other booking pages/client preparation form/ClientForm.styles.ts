import styled from "styled-components";
import tw from "twin.macro";

export const StyledClientForm = styled.div`
    /* padding: 40px 40px; */
    ${tw` p-[29px] md:p-[40px]`}
    input,textarea{
        border:1px solid black;
    }

`

export const CFTop = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;

    h2{
        color: #000;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
    }

    p{
        color: #8A8077;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    button{
        width: 150px;
        height: 40px;
        flex-shrink: 0;
        border-radius: 5px;
        border: 1px solid #FF8500;
        color: #FF8500;
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 180%;

        ${tw` w-[100px] text-[10px] tracking-tight truncate md:text-[16px] md:w-[150px]`}
    }
`

export const CFInputs = styled.div`
    padding-top:40px;

`

export const CFTopInputSection = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    column-gap:30px;
    align-items:center;
    justify-content:space-between;
    margin-bottom:20px;
    flex-wrap:wrap;

    ${tw` sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}

    h4{
        font-size:13px;
        font-weight:500;
        color:red;
    }

    div{

        margin: 15px 0;


        label{
            color: rgba(0, 0, 0, 0.51);
            font-size: 15px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }

        input{
            width:100%;
            height:38px;
            flex-shrink:0;
            border-radius: 5px;
            border: 1px solid #EEE;
            background: #FBFBFB;
            padding:10px;
        }
    }

`

export const CFTextArea = styled.div`
        margin: 30px 0 ;
            label{
            color: rgba(0, 0, 0, 0.51);
            font-size: 15px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }

        h4{
            font-size:13px;
            font-weight:500;
            color:red;
        }

        textarea{
            width:100%;
            height:130px;
            border-radius: 5px;
            resize:none;
            padding:10px;
            border: 1px solid #EEE;
            background: #FBFBFB;
        }
`

export const CFFileInput = styled.div`
  
    p{
        color: rgba(0, 0, 0, 0.51);
            font-size: 15px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
    }

    div{
        position:relative;
        margin:20px 0;
        display:flex;
        justify-content:space-around;
        align-items:center;
        border: 1px solid rgba(0, 0, 0, 0.36);
        border-radius:6px;
        border-style:dashed;
        width:150px;
        height:42px;
  
        color: rgba(0, 0, 0, 0.36);
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    input{
        display:none;
    }

`

export const FileCount = styled.span`
    position:absolute;
    top:-10px;
    right:-10px;
    height:20px;
    width:20px;
    border-radius:30px;
    background: red;
    border: 1px solid white;
    color: #fff;
    font-size:12px;
    font-weight:500;
    display:flex;
    justify-content:center;
    align-items:center;
`

export const CFCheckBox = styled.div`
    margin:20px 0;
   
    p{
        color: rgba(0, 0, 0, 0.51);
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
     }

         h4{
            font-size:13px;
            font-weight:500;
            color:red;
        }


     div{

        span{
            display:flex;
            align-items:center;

        }

        label{
            color: rgba(0, 0, 0, 0.51);
            font-size: 15px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
        
        input{
            width: 16px;
            height: 16px;
            border-radius: 3px;
            border: 1px solid #FF8500;
            flex-shrink: 0;
            margin:0 10px;
     }
     }
`

export const FCButtons = styled.div`
    div{

    }

    span{

    }
`