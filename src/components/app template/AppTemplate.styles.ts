import styled from "styled-components";
import tw from "twin.macro";


export const StyledApp = styled.div`

    position:relative;
    min-height:100dvh;

    & header{
        display:grid;
        grid-template-columns:40px 1fr 80px;
            @media (max-width:580px) {
                grid-template-columns:40px 1fr ;
            }
        ${tw` h-[90px]  gap-x-[20px] lg:gap-x-[30px] shadow-sm bg-white  px-[10px] lg:px-[40px]  `}


        & span{
            display:flex;
            align-items:center;
        }

        & ul{
            display:flex;
            align-items:center;
            ${tw` hidden lg:flex md:flex`}

            & a{
                ${tw` text-[18px] font-medium mx-[8px]`}
            } 
        }

            & nav{
                    display:flex;
                    justify-content:end;
                    align-items:center;
                    position:relative;
                ${tw`  md:hidden lg:hidden `}
            }

    }

    & main{
        min-height:400px;
    }

`

export const HeaderLeft = styled.div`
                display:flex;
                align-items:center;
                justify-content:space-between;
                position:relative;
                ${tw` hidden lg:flex md:flex`}
`

export const StyledSection = styled.section`

` 
