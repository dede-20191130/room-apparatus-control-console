import { IOperationConditionSgl } from "api/operation-condition-api/operation-condition";
import { IRoomRoomsInfo } from "api/rooms-info-api/rooms-info";
import { memo } from "react";
import isDeepEqual from 'fast-deep-equal/react'
import { composeAppaConds } from "./room-cond-composer";
import { parseRoomNm } from "util/manage-room-info/room-name-parser";
import { useUpdateOCWhenPathnameChanged } from "components/hooks/oc-management/update-oc";
import { RoomImageArea } from "./room-image-area";
import { ApparatusSymbol } from "./apparatus-symbol";
import styled from "styled-components";
import { mediaQueries } from "components/design/media-query-setting";


const RoomIndexDiv = styled.div`
padding:10px  0 0 40px;
`


const ImageAreaContainerDiv = styled.div`
${mediaQueries("md")`
display: inline-block;
padding:100px 50px;
border:2px solid green;
border-radius:10px;
`}
`

export const RoomIndex = memo(
    ({ roomId, myroomInfo, myOpeCond }: { roomId: string, myroomInfo: IRoomRoomsInfo, myOpeCond: IOperationConditionSgl }) => {
        useUpdateOCWhenPathnameChanged();
        const appaConds = composeAppaConds(myroomInfo, myOpeCond);
        return (
            <RoomIndexDiv>
                <h3>{parseRoomNm(roomId)}&nbsp;運転状況概要</h3>
                {/* todo image-areaをモバイル用にデザインし直し
                機器名前とsvgをペアにしたテーブルのデザインとする
                名前の情報を追加する */}
                <ImageAreaContainerDiv>
                    <RoomImageArea>
                        {appaConds && Object.entries(appaConds).map(appaCondEntry => (
                            <ApparatusSymbol key={appaCondEntry[0]}
                                appaCondEntry={appaCondEntry} roomId={roomId}
                            ></ApparatusSymbol>
                        ))}

                    </RoomImageArea>
                </ImageAreaContainerDiv>
            </RoomIndexDiv>
        )
    }
    , isDeepEqual
)