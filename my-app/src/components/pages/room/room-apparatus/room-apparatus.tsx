import { memo } from "react"
import isDeepEqual from 'fast-deep-equal/react'
import { tIntegratedDataset } from "../integrated-apparatus-dara-set"
import { CurrentSettingArea } from "./cs-area"
import { OpeErrorArea } from "./ope-err-area"
import {useUpdateOCWhenPathnameChanged } from "components/hooks/oc-management/update-oc"
import styled from "styled-components"

const ApparatusInfoContainerDiv = styled.div`
padding:10px  0 0 40px;
`

const StyledH3=styled.h3`
display: inline-block;
padding: 9px;
border-radius: 15px;
background-color: #006616;
`

export const RoomApparatus = memo(({ integratedData }: { integratedData: tIntegratedDataset[number] }) => {
    useUpdateOCWhenPathnameChanged();
    return (
        <ApparatusInfoContainerDiv>
            <div>
                <StyledH3>{integratedData.name}</StyledH3>
            </div>
            <CurrentSettingArea integratedData={integratedData}></CurrentSettingArea>
            <OpeErrorArea integratedData={integratedData}></OpeErrorArea>
        </ApparatusInfoContainerDiv>
    )
}, isDeepEqual)