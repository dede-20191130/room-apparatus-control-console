import { parseRoomNm } from "../../../util/manage-room-info/room-name-parser"
import { tRoomCondInfos } from "./room-cond-info-hook"

export const RoomCondIndicator = ({ roomCondInfo }: { roomCondInfo: tRoomCondInfos[number] }) => {
    return (
        <>
            <h4>{parseRoomNm(roomCondInfo.id)}</h4>
            <table>
                <tbody>
                    {roomCondInfo.apparatus
                        ? roomCondInfo.apparatus.map(appa => {
                            return (
                                <tr key={appa.id}>
                                    <td>{appa.name}</td>
                                    <td>
                                        {(() => {
                                            const condInfoSet = createCondInfoSet(appa.error);
                                            return <span className={condInfoSet[1]}>{condInfoSet[0]}</span>
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
            </table>
        </>
    )
}

function createCondInfoSet(error: { isError: boolean } | undefined) {
    return error
        ? error.isError
            ? ["異常", "error"]
            : ["正常", "normal"]
        : ["-", "no-cond"];
}