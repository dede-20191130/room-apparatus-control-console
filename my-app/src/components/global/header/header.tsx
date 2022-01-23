import { fadeInKeyframes } from "components/design/animation-conf"
import { mediaQueries } from "components/design/media-query-setting"
import { useCallback, useRef, useState } from "react"
import styled, { css } from "styled-components"
import { AlertGenerator } from "./alert-generator"
import { AlertIndicator } from "./alert-indicator"

const StyledTagOfHeader = styled.header`
display:flex;
align-items:center;
justify-content:space-between;
position:fixed;
top:0;
left:0;
z-index:3;
overflow:hidden;
width:100vw;
height:70px;
padding-right:16px;
background-color:#222222;
`

interface IFlexContainerDivProps {
    readonly justify?: string;
}

interface HTMLEvent<T extends EventTarget> extends Event {
    target: T;
    currentTarget: T;
}

const flexContainerCss = css<IFlexContainerDivProps>`
display:flex;
align-items:center;
justify-content:${props => props.justify || "flex-start"};
height:100%;
`

const FlexContainerDiv = styled.div<IFlexContainerDivProps>`
${flexContainerCss};
`

const AlertContainerDiv = styled.div<IFlexContainerDivProps>`
    display:none;
    &.active{
        display:flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
        top: 70px;
        width: 100vw;
        background-color: #8f8f8f;
        animation:fadeIn 0.5s ease-out 0s;
        & > *{
            margin:15px 0;
        }
    }
    ${mediaQueries("sm")`
    &.active{
        right: 30px;
        width: 180px;
    }
    `
    }
    ${mediaQueries("md")`
    ${flexContainerCss};
    `
    }

    ${fadeInKeyframes()}
`

const StyledH1 = styled.h1`
    display:none;
    margin:0;
    padding:10px 20px;
    ${mediaQueries("sm")`
    display:block;
    font-size:16px;
    `}
    ${mediaQueries("md")`
    font-size:32px;
    
    `}
`

const TitleIconDiv = styled.div`
    background: green;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-left: 10px;
    color: #fff;
    font-size: 32px;
    text-align: center;
    line-height: 50px;
    ${mediaQueries("sm")`
    display:none;
    `}
    
`

const headerButtonIconMixin = css`
border: none;
background: none;
font-size: 2em;
cursor: pointer;
${mediaQueries("md")`
    display:none;
`}

`

const AlertAreaToggleGearButton = styled.button`
${headerButtonIconMixin};
`

const HamburgerMenuButton = styled.button`
${headerButtonIconMixin};
color:white;

`


export const Header = ({ setIsActiveOfSidebar }: {
    setIsActiveOfSidebar: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [isOpenAlertArea, setIsOpenAlertArea] = useState(false);
    const areaNodeRef = useRef<HTMLDivElement>(null);

    const toggleAlertArea = useCallback(() => {
        setIsOpenAlertArea(true);
        setTimeout(() => {
            document.addEventListener("click", documentClickHandlerForAlertArea)
        }, 100);
    }, [setIsOpenAlertArea]);

    const documentClickHandlerForAlertArea = useCallback((ev: MouseEvent) => {
        if (areaNodeRef.current === null) return;
        if (!(ev.target instanceof Element)) return;
        if (areaNodeRef.current.contains(ev.target)) return;
        setIsOpenAlertArea(false);
        document.removeEventListener('click', documentClickHandlerForAlertArea)

    }, [setIsOpenAlertArea, areaNodeRef.current])

    return (
        <StyledTagOfHeader className="nav-header">
            <FlexContainerDiv>
                <TitleIconDiv>居</TitleIconDiv>
                <StyledH1>居室内機器監視システム</StyledH1>
                <HamburgerMenuButton
                    onClick={() => setIsActiveOfSidebar((prevState: boolean) => !prevState)}
                >
                    ☰
                </HamburgerMenuButton>
            </FlexContainerDiv>
            <AlertAreaToggleGearButton
                onClick={() => !isOpenAlertArea && toggleAlertArea()}>
                ⚙️
            </AlertAreaToggleGearButton>
            <AlertContainerDiv
                justify="flex-end" ref={areaNodeRef}
                className={isOpenAlertArea ? "active" : ""}
            >
                <AlertIndicator></AlertIndicator>
                <AlertGenerator></AlertGenerator>
            </AlertContainerDiv>
        </StyledTagOfHeader>
    )
}