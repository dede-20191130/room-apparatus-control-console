import { memo } from 'react'
import isDeepEqual from 'fast-deep-equal/react'
import { IRoomRoomsInfo } from "api/rooms-info-api/rooms-info";
import { LinkDisabledOnActive } from "components/ui/link/link-disabled-on-active";
import { useContext } from "react"
import { getApparatusNames } from "./apparatus-names"

export const RoomHeader = memo(({ myroomInfo }: { myroomInfo: IRoomRoomsInfo }) => {
    const apparatusIDNames = getApparatusNames(myroomInfo);
    return (
        <div>
            <ul>
                <li><LinkDisabledOnActive to="index">インデックス</LinkDisabledOnActive></li>
                {apparatusIDNames?.map(idnm => {
                    return (
                        <li key={idnm.id}><LinkDisabledOnActive to={idnm.id}>{idnm.name}</LinkDisabledOnActive></li>
                    )
                })}
            </ul>
        </div>
    )
}, isDeepEqual)