import { StickyHeaderPanelDiv } from "components/ui/box/sticky-header-panel";
import { useCallback, useState } from "react";
import { tIntegratedDataset } from "../integrated-apparatus-dara-set";
import { CurrentArea } from "./current-area";
import { SettingArea } from "./setting-area";



export const CurrentSettingArea = ({ integratedData }: { integratedData: tIntegratedDataset[number] }) => {
    const [isEdit, setIsEdit] = useState(false);
    const setEditable = useCallback(() => setIsEdit(true), [setIsEdit],)
    const setUnEditable = useCallback(() => setIsEdit(false), [setIsEdit],)
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