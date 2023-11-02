import styled from "styled-components";
import tw from "twin.macro";


export const StyledSignin = styled.div`
    background-color:white;
    display:flex;
    
    & section {
        width:400px;
        background-color:#FEF7EF;
        ${tw` hidden lg:block p-[40px] `}
      

              & p{
                margin-top:20px;
                font-size:20px;
                font-weight:700;
                display:block;
              }

              & div{
                height:70dvh;
              }
    }

    & main {
        flex:2;
        ${tw`   `}
    }
`



export const Img = styled.img`
    width:${ (props) => props.width};
    height:${ (props) => props.height};
`

export const RightSection = styled.div`
            margin-top:17dvh;
            padding-top:20px;
            width:400px;
            margin-left:auto;
            margin-right:auto;
            ${tw` mx-auto lg:ml-[10dvh] px-[4dvh] `}

            & h3{
                color: #8A8077;
                font-size: 13px;
                font-weight: 300;
                line-height: 180%; /* 27px */
            }

            & h4{
                color: #8A8077;
                display:inline-block;
                text-align: center;
                font-size: 13px;
                font-weight: 400;
                margin-top:10px;
                margin-bottom:5px;
                line-height: 140.625%;
                white-space:nowrap;

            }

            & form{ 
                margin-top:20px;
                
             & div{
     
              }
            }

            & p{
                font-weight:700;
                font-size:20px;
            }

            

            & input{ 
               flex:1;
               margin-left:4px;
               margin-right:4px;
               display:inline-block;
               height:100%;
                background-color:transparent;
                
                &:focus{
                    outline:none;
                }
            }


            & a{

                &:focus{
                   outline:none;
                }
                ${tw` inline-block  justify-end cursor-pointer text-[#FF8500] text-[12px]`}
             }
`

export const Input = styled.div`
           margin-top:18px;
           margin-bottom:8px;
           font-size:14px;
                
            & span {
               width:100%;
               display:flex;
               margin-top:5px;
               height:40px;
               padding:10px;
               border: 1px solid ${props => props.color || 'gray' } ;
               border-radius:3px;
            }

            & p{
                font-size:12px;
                margin:0;
                margin-left:10px;
                padding:0;
                font-weight:500;
                color: red;
            }


`

export const CheckBox = styled.div`

            text-align: center;
            align-items:center;
            font-size: 12px;
            font-weight: 500;
            line-height: 140.625%;
            letter-spacing: -0.05em;

    ${tw` flex my-4 truncate `}
`

export const StyledButton = styled.button`
        &:hover{
            opacity: 0.8;
        }
        &:active{
            opacity: 1;
        }
    ${tw`h-[45px]  bg-[#FF8500]  w-[100%] rounded-[3px] mt-2 text-[16px]  text-white  flex items-center justify-center`}
`

export const Break = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-top:4px;
    margin-bottom:4px;
    
    & span{
        width:45%;
        height:1px;
        background-color:lightgray;
    }

    & p{
        font-size:16px;
    }
`

export const Footer = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;

    & div{
       display:flex;
       align-items:center;
       border-radius:2px;
       cursor: pointer;

       ${tw` lg:px-[16px] px-[8px] py-[8px]`}
       

        & p{
            margin-left:6px;
            font-size:12px;
            font-weight:600;
        }
    }
`
