import styled from "styled-components";

export const StyledPagination = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    max-width: 300px;
    padding: 30px 10px;
    margin-left:auto;
    margin-right:auto;
`

export const Page = styled.div<{active?: boolean}>`
    height:32px;
    width:32px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:${ props => props.active ? "#FFF" :"black" };
    border: 1px solid ${ props => props.active ? "none" :"gray"};
    border-radius: 5px;
    margin:"0 6px";
    background: ${ props => props.active ? "#FF8500" :""};
`