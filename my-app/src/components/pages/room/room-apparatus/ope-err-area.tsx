import { recoverOpeError } from "api/operation-condition-api/operation-condition";
import { StickyHeaderPanelDiv } from "components/ui/box/sticky-header-panel";
import { ThemedButton } from "components/ui/button/themed-button";
import { LineBreakReflectSpan } from "components/ui/generic-inlines/linebreak-reflrect-span";
import { ThemedTable } from "components/ui/table/themed-table";
import { updateOCsContext } from "context/oc-context";
import { useContext } from "react";
import styled from "styled-components";
import { tIntegratedDataset } from "../integrated-apparatus-dara-set";
import { RoomIdContext } from "../room-frame";
import { ButtonSection } from "./cs-area-button-section";

const IndicatingSpan = styled.span`
color:lightgreen;
&.error{
    color:red;
}
`

export const OpeErrorArea = ({ integratedData }: { integratedData: tIntegratedDataset[number] }) => {
    const isError = integratedData.error.isError;
    const roomId = useContext(RoomIdContext);
    const updateOCs = useContext(updateOCsContext);
    const handleClick = async () => {
        await recoverOpeError(roomId, integratedData.id);
        await new Promise(resolve => setTimeout(resolve, Math.random() * 3000));
        if (updateOCs) await updateOCs();
    }
    return (
        <StickyHeaderPanelDiv baseColor="green" headFont={18}>

            <div>
                <h4>💻 運転状況</h4>
            </div>
            <div>
                <ThemedTable>
                    <tbody>
                        <tr>
                            <th>ステータス</th>
                            <td>
                                <IndicatingSpan className={isError ? "error" : ""}>{isError ? "エラー" : "正常"}</IndicatingSpan>
                            </td>
                        </tr>
                        {isError && (
                            <tr>
                                <th>状況</th>
                                <td>
                                    <LineBreakReflectSpan>
                                        {integratedData.error.content}

                                    </LineBreakReflectSpan>
                                </td>
                            </tr>

                        )}
                    </tbody>
                </ThemedTable>
                <ButtonSection>
                    {isError && (
                        <ThemedButton onClick={() => handleClick()}>復旧</ThemedButton>
                    )}
                </ButtonSection>
            </div>
        </StickyHeaderPanelDiv>
    )
}