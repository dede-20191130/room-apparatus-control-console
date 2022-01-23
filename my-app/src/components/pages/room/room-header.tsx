import { memo, useState } from 'react'
import isDeepEqual from 'fast-deep-equal/react'
import { IRoomRoomsInfo } from "api/rooms-info-api/rooms-info";
import { LinkClassifiedOnActive } from "components/ui/link/link-classified-on-active";
import { getApparatusNames } from "./apparatus-names"
import styled from 'styled-components';
import { mediaQueries } from 'components/design/media-query-setting';
import { useLocationPathChange } from 'components/hooks/path/location-path-change-hook';

const RoomHeaderNav = styled.nav`
display:flex;
position:relative;
height:50px;
border-bottom:5px solid #006616;
${mediaQueries("md")`
height:auto;
`}
`

const FlexContainerUl = styled.ul`
display:flex;
flex-direction:column;
flex-wrap: nowrap;
position:absolute;
top:50px;
left:-280px;
z-index: 2;
overflow: hidden;
visibility:collapse;
width:280px;
margin:0;
padding-left: 0;
background-color:#222222;
list-style:none;
transition: left 0.3s ease-out 0s,visibility 0s linear 0.3s;
&.active{
    left:0;
    visibility:visible;
    transition: left 0.3s ease-out 0s;
}
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
            background-color:#006616;
            color: #dff5ff;
        }
        &.nav-active{
            background-color:#006616;
            color: #dff5ff;
        }
        ::before{
            content:"🔧 ";
        }
    }
}
${mediaQueries("md")`
flex-direction:row;
position:static;
visibility:visible;
width:auto;
background-color:initial;
transition:none;

`}
`
const RoomHamburgerMenuButton = styled.button`
border: none;
background: none;
color:white;
font-size: 1.5em;
cursor: pointer;
${mediaQueries("md")`
    display:none;
`}
`

export const RoomHeader = memo(({ myroomInfo }: { myroomInfo: IRoomRoomsInfo }) => {
    const apparatusIDNames = getApparatusNames(myroomInfo);
    const [isActiveRoomHeaderMenu, setIsActiveRoomHeaderMenu] = useState(false);
    useLocationPathChange(() => {
        setIsActiveRoomHeaderMenu(false);
    });
    return (
        <RoomHeaderNav>
            <RoomHamburgerMenuButton
                onClick={() => setIsActiveRoomHeaderMenu((prevState: boolean) => !prevState)}
            >
                ☰
            </RoomHamburgerMenuButton>
            <FlexContainerUl className={isActiveRoomHeaderMenu ? "active" : ""}>
                <li><LinkClassifiedOnActive to="index">インデックス</LinkClassifiedOnActive></li>
                {apparatusIDNames?.map(idnm => {
                    return (
                        <li key={idnm.id}><LinkClassifiedOnActive to={idnm.id}>{idnm.name}</LinkClassifiedOnActive></li>
                    )
                })}
            </FlexContainerUl>
        </RoomHeaderNav>
    )
}, isDeepEqual)