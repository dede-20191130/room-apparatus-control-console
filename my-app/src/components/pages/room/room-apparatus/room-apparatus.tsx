import { memo } from "react"
import isDeepEqual from 'fast-deep-equal/react'
import { tIntegratedDataset } from "../integrated-apparatus-dara-set"
import { CurrentSettingArea } from "./cs-area"
import { OpeErrorArea } from "./ope-err-area"

export const RoomApparatus = memo(({ integratedData }: { integratedData: tIntegratedDataset[number] }) => {
    return (
        <div>
            <div>
                <h3>{integratedData.name}</h3>
            </div>
            <CurrentSettingArea integratedData={integratedData}></CurrentSettingArea>
            <OpeErrorArea integratedData={integratedData}></OpeErrorArea>
        </div>
    )
}, isDeepEqual)