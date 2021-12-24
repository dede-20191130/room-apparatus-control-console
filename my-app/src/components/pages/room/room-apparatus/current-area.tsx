import { ThemedButton } from "components/ui/button/themed-button";
import { ThemedTable } from "components/ui/table/themed-table";
import { tIntegratedDataset } from "../integrated-apparatus-dara-set";
import { ButtonSection } from "./cs-area-button-section";
import { csInfos } from "./cs-info-for-tbl";
import { THead } from "./cs-tbl-thead";

export const CurrentArea = ({ onCngbtnClick, integratedData }: { onCngbtnClick: () => void, integratedData: tIntegratedDataset[number] }) => {
    return (
        <div>
            <ThemedTable>
                <THead></THead>
                <tbody>
                    {integratedData.conditions.map(cond => {
                        const csInfo = csInfos.find(info => info.name === cond.name);
                        if (!csInfo) return null;
                        return (
                            <tr key={cond.name}>
                                <td>{csInfo.logiName}</td>
                                <td>{csInfo.attachDisplayNm(cond.setPoint)}</td>
                                <td>{csInfo.attachDisplayNm(cond.current)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </ThemedTable>
            <ButtonSection>
                <ThemedButton onClick={onCngbtnClick}>設定変更</ThemedButton>
                <ThemedButton disabled>完了</ThemedButton>
            </ButtonSection>
        </div>
    )
}