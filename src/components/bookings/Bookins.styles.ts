import styled from "styled-components";
import tw from "twin.macro";


export const StyledBookings = styled.div`
    padding:20px;

    ${tw` px-[20px] md:px-[40px]`}
`

export const Books = styled.div`
    position:relative;
    display:grid;
    min-height:270px;
    padding-top:20px;
    padding-bottom:20px;



    @media (min-width: 1120px) {
        grid-template-columns:1fr 1fr 1fr;
        column-gap:30px;
    }

    @media (min-width: 780px)  and (max-width: 1120px){
        column-gap:30px;
        grid-template-columns: 1fr 1fr;
    }



    @media (max-width: 780px) {
        grid-template-columns:1fr;
    }

    
    ${tw` gap-y-[50px]`}
`

export const StyledTop = styled.div`
    padding:10px 0px;
    display:flex;
    align-items:center;

    justify-content:space-between;

    button{
        flex-shrink: 0;
        border-radius: 5px;
        background: #FF8500;
        color: #FFF;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        ${tw` w-[90px] h-[34px] text-[14px] md:h-[40px] md:text-[16px] md:w-[120px]`}
    }
`

export const Sect2 = styled.section`
    display:flex;
    justify-content:space-between;
    align-items:baseline;
    padding-top:40px;

    p{
        color: #000;
        font-size: 17px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;

        strong{
            color: #FF8500;
            font-size: 17px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
    }
    div{

    }
`
