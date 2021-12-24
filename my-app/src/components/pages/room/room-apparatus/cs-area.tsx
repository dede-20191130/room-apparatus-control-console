import { StickyHeaderPanelDiv } from "components/ui/box/sticky-header-panel";
import { useCallback, useContext, useEffect, useState } from "react";
import { tIntegratedDataset } from "../integrated-apparatus-dara-set";
import { RoomIdContext } from "../room-frame";
import { CurrentArea } from "./current-area";
import { SettingArea } from "./setting-area";



export const CurrentSettingArea = ({ integratedData }: { integratedData: tIntegratedDataset[number] }) => {
    const roomId = useContext(RoomIdContext);
    const [isEdit, setIsEdit] = useState(false);
    const setEditable = useCallback(() => setIsEdit(true), [setIsEdit],)
    const setUnEditable = useCallback(() => setIsEdit(false), [setIsEdit],)

    // 機器ページ変更時に設定値変更モードを強制終了
    useEffect(() => {
        console.log(roomId)
        console.log(integratedData.id)
        setUnEditable();
    }, [roomId, integratedData.id])

    return (
        <StickyHeaderPanelDiv baseColor="green" headFont={18}>
            <div>
                <h4>🔧 現在値 / 設定値</h4>
            </div>
            {isEdit
                ? <SettingArea onCmplBtnClick={setUnEditable} integratedData={integratedData}></SettingArea>
                : <CurrentArea onCngbtnClick={setEditable} integratedData={integratedData}></CurrentArea>
            }
        </StickyHeaderPanelDiv>
    )
}