import { memo } from 'react'
import isDeepEqual from 'fast-deep-equal/react'
import { parseRoomNm } from "util/manage-room-info/room-name-parser";
import { tRoomCondInfos } from "./room-cond-info-hook"
import styled from 'styled-components';
import { ThemedTable } from 'components/ui/table/themed-table';

const StyledH4 = styled.h4`
margin: 0;
background-color: rgb(103 169 28 / 30%);
text-align: center;
`

const IndicatingSpan = styled.span`
&.normal{
    color:lightgreen;
}
&.error{
    color:red;
}
`

export const RoomCondIndicator = memo(({ roomCondInfo }: { roomCondInfo: tRoomCondInfos[number] }) => {
    return (
        <div>
            <StyledH4>{parseRoomNm(roomCondInfo.id)}</StyledH4>
            <ThemedTable>
                <tbody>
                    {roomCondInfo.apparatus
                        ? roomCondInfo.apparatus.map(appa => {
                            return (
                                <tr key={appa.id}>
                                    <td>{appa.name}</td>
                                    <td>
                                        {(() => {
                                            const condInfoSet = createCondInfoSet(appa.error);
                                            return <IndicatingSpan className={condInfoSet[1]}>{condInfoSet[0]}</IndicatingSpan>
                                        })()}
                                    </td>
                                </tr>
                            )
                        })
                        : (
                            <tr><td colSpan={2}>機器運転情報無し</td></tr>
                        )
                    }
                </tbody>
            </ThemedTable>
        </div>
    )
}, isDeepEqual)

function createCondInfoSet(error: { isError: boolean } | undefined) {
    return error
        ? error.isError
            ? ["異常", "error"]
            : ["正常", "normal"]
        : ["-", "no-cond"];
}