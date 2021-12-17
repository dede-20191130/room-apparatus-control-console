import { recoverOpeError } from "api/operation-condition-api/operation-condition";
import { updateOCsContext } from "context/oc-context";
import { useContext } from "react";
import { tIntegratedDataset } from "../integrated-apparatus-dara-set";
import { RoomIdContext } from "../room-frame";

export const OpeErrorArea = ({ integratedData }: { integratedData: tIntegratedDataset[number] }) => {
    const isError = integratedData.error.isError;
    const roomId = useContext(RoomIdContext);
    const updateOCs = useContext(updateOCsContext);
    const handleClick = async () => {
        await recoverOpeError(roomId, integratedData.id);
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (updateOCs) await updateOCs();
    }
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
                <button onClick={() => handleClick()}>復旧</button>
            )}
        </div>
    )
}