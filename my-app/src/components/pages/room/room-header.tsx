import { memo } from 'react'
import isDeepEqual from 'fast-deep-equal/react'
import { IRoomRoomsInfo } from "api/rooms-info-api/rooms-info";
import { LinkClassifiedOnActive } from "components/ui/link/link-classified-on-active";
import { useContext } from "react"
import { getApparatusNames } from "./apparatus-names"
import styled from 'styled-components';

const FlexContainerUl = styled.ul`
display:flex;
overflow: hidden;
flex-wrap: nowrap;
margin:0;
padding-left: 0;
border-bottom:5px solid #006616;
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
`

export const RoomHeader = memo(({ myroomInfo }: { myroomInfo: IRoomRoomsInfo }) => {
    const apparatusIDNames = getApparatusNames(myroomInfo);
    return (
        <nav>
            <FlexContainerUl>
                <li><LinkClassifiedOnActive to="index">インデックス</LinkClassifiedOnActive></li>
                {apparatusIDNames?.map(idnm => {
                    return (
                        <li key={idnm.id}><LinkClassifiedOnActive to={idnm.id}>{idnm.name}</LinkClassifiedOnActive></li>
                    )
                })}
            </FlexContainerUl>
        </nav>
    )
}, isDeepEqual)