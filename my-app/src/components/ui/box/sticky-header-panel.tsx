import styled from "styled-components";

interface IStickyHeaderPanelDivPorps {
    readonly baseColor?: string;
    readonly headFont?: number;
}

export const StickyHeaderPanelDiv = styled.div<IStickyHeaderPanelDivPorps>`
max-width:1200px;
margin-bottom: 20px;
border: 1px solid ${props => props.baseColor || props.theme.color || "transparent"};
border-radius: 4px;
-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
box-shadow: 0 10px 10px rgb(0 0 0 / 5%);
& > div:first-of-type{
    color: #ffffff;
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    border-color: ${props => props.baseColor || props.theme.color || "transparent"};
    background-color: ${props => props.baseColor || props.theme.color || "transparent"};
    & > h1,h2,h3,h4,h5,h6{
        margin-top: 0;
        margin-bottom: 0;
        font-size: ${props => `${props.headFont || 16}px`};
        color: inherit;
    }
}
& > div:nth-of-type(2){
    padding:15px;
}
`