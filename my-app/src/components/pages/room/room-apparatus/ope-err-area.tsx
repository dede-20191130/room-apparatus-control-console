import { recoverOpeError } from "api/operation-condition-api/operation-condition";
import { useContext } from "react";
import { tIntegratedDataset } from "../integrated-apparatus-dara-set";
import { RoomIdContext } from "../room-frame";

export const OpeErrorArea = ({ integratedData }: { integratedData: tIntegratedDataset[number] }) => {
    const isError = integratedData.error.isError;
    const roomId = useContext(RoomIdContext);
    return (
        <div>
            <div>
                <h4>運転状況</h4>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>ステータス</th>
                        <td className={isError ? "error" : ""}>{isError ? "エラー" : "正常"}</td>
                    </tr>
                    {isError && (
                        <tr>
                            <th>状況</th>
                            <td>{integratedData.error.content}</td>
                        </tr>

                    )}
                </tbody>
            </table>
            {isError && (
                <button onClick={async () => await recoverOpeError(roomId, integratedData.id)}>復旧</button>
            )}
        </div>
    )
}