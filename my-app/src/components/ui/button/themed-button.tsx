import styled from "styled-components";

interface IThemedButtonProps{
    readonly color?: string;
    readonly backgroundColor?: string;
    readonly borderColor?: string;

}

export const ThemedButton = styled.button<IThemedButtonProps>`
color: ${props=>props.color || "#ffffff"};
background-color: ${props=>props.backgroundColor || "#2196f3"};
border-color: ${props=>props.borderColor || "#424242"};
display: inline-block;
margin-bottom: 0;
font-weight: normal;
text-align: center;
vertical-align: middle;
cursor: pointer;
background-image: none;
border: 1px solid transparent;
white-space: nowrap;
padding: 8px 12px;
font-size: 14px;
line-height: 1.42857143;
border-radius: 4px;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
&:hover{
    filter: brightness(125%);
}
&:disabled{
    color:#c7c7c7;
    background-color:#787878;
    filter: initial;
}
`