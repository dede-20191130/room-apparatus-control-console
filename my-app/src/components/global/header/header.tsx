import styled from "styled-components"
import { AlertGenerator } from "./alert-generator"
import { AlertIndicator } from "./alert-indicator"

const StyledTagOfHeader = styled.header`
display:flex;
position:fixed;
overflow:hidden;
height:70px;
top:0;
left:0;
`

const StyledH1 = styled.h1`
height:100%;
margin:0;
padding:10px 20px;
`

export const Header = () => {
    return (
        <StyledTagOfHeader className="nav-header">
            <StyledH1>居室内機器監視システム</StyledH1>
            <AlertIndicator></AlertIndicator>
            <AlertGenerator></AlertGenerator>
        </StyledTagOfHeader>
    )
}