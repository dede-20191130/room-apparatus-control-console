import { IOperationConditionSgl } from "api/operation-condition-api/operation-condition";
import { IRoomRoomsInfo } from "api/rooms-info-api/rooms-info";
import { memo } from "react";
import isDeepEqual from 'fast-deep-equal/react'
import { composeAppaConds } from "./room-cond-composer";
import { parseRoomNm } from "util/manage-room-info/room-name-parser";
import { useUpdateOCWhenPathnameChanged } from "components/hooks/oc-management/update-oc";

export const RoomIndex = memo(
    ({ roomId, myroomInfo, myOpeCond }: { roomId: string, myroomInfo: IRoomRoomsInfo, myOpeCond: IOperationConditionSgl }) => {
        useUpdateOCWhenPathnameChanged();
        const appaConds = composeAppaConds(myroomInfo, myOpeCond);
        return (
            <div>
                <h3>{parseRoomNm(roomId)}&nbsp;運転状況概要</h3>
                {/* todo svgの学習＆仕様の確定まで仮置 */}
                {appaConds?.map(cond => (
                    <div key={cond.id}>
                        <p>{cond.name}</p>
                        <p>{cond.isError}</p>
                    </div>
                ))}
            </div>
        )
    }
    , isDeepEqual
)