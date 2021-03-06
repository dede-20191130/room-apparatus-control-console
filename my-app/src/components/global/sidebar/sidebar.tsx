import { mediaQueries } from "components/design/media-query-setting";
import styled from "styled-components";
import { useCreateList } from "./list-for-sidebar"
import { NavRoom } from "./nav-room";
import { NavTop } from "./nav-top";

const StyledNav = styled.nav`
position:fixed;
left:-200px;
z-index:2;
visibility:collapse;
width:200px;
background-color:#222222;
transition: left 0.3s ease-out 0s,visibility 0s linear 0.3s;
&.active{
    display:block;
    left:0;
    visibility:visible;
    transition: left 0.3s ease-out 0s;
}
${mediaQueries("md")`
position:static;
visibility:visible;
transition:none;
`}

`

const StyledUl = styled.ul`
display:flex;
overflow: hidden;
flex-wrap: nowrap;
flex-direction: column;
padding-left: 0;
list-style:none;
& > li{
    a{
        display:block;
        padding: 10px 35px 10px 35px;
        text-decoration: none;
        &:link{
            color: #ffffff;
        }
        &:visited{
            color: #ffffff;
        }
        &:hover{
            background-color:#8b8b8b;
            color: #dff5ff;
        }
        &.nav-active{
            background-color:#8b8b8b;
            color: #dff5ff;
        }
        ::before{
            content:"🚪";
        }
    }
}
`

export const Sidebar = ({ isActiveOfSidebar }: { isActiveOfSidebar: boolean }) => {
    const roomIds = useCreateList();
    return (
        <StyledNav className={isActiveOfSidebar ? "active" : ""}>
            <StyledUl>
                <NavTop></NavTop>
                {roomIds && roomIds.map((roomId) => {
                    return <NavRoom key={roomId} roomId={roomId}></NavRoom>
                })}

            </StyledUl>

        </StyledNav>
    )
}