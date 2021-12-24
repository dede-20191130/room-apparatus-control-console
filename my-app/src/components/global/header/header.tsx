import styled from "styled-components"
import { AlertGenerator } from "./alert-generator"
import { AlertIndicator } from "./alert-indicator"

const StyledTagOfHeader = styled.header`
display:flex;
align-items:center;
justify-content:space-between;
position:fixed;
top:0;
left:0;
overflow:hidden;
width:100vw;
height:70px;
padding-right:16px;
background-color:#222222;
`

interface IFlexContainerDivProps {
    readonly justify?: string;
}

const FlexContainerDiv = styled.div<IFlexContainerDivProps>`
display:flex;
align-items:center;
justify-content:${props => props.justify || "flex-start"};
height:100%;
`

const StyledH1 = styled.h1`
margin:0;
padding:10px 20px;
`

export const Header = () => {
    return (
        <StyledTagOfHeader className="nav-header">
            <FlexContainerDiv>
                <StyledH1>居室内機器監視システム</StyledH1>
            </FlexContainerDiv>
            <FlexContainerDiv justify="flex-end">
                <AlertIndicator></AlertIndicator>
                <AlertGenerator></AlertGenerator>
            </FlexContainerDiv>
        </StyledTagOfHeader>
    )
}