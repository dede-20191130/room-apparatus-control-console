import { setOperationConditionSgl } from "api/operation-condition-api/operation-condition";
import { ThemedButton } from "components/ui/button/themed-button";
import { ThemedTable } from "components/ui/table/themed-table";
import { updateOCsContext } from "context/oc-context";
import { useContext, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { tIntegratedDataset } from "../integrated-apparatus-dara-set";
import { RoomIdContext } from "../room-frame";
import { ButtonSection } from "./cs-area-button-section";
import { csInfos } from "./cs-info-for-tbl";
import { THead } from "./cs-tbl-thead";

export interface IFormValues {
    cond: {
        setPoint: string | boolean | number
    }[]
}

export const SettingArea = ({ onCmplBtnClick, integratedData }: { onCmplBtnClick: () => void, integratedData: tIntegratedDataset[number] }) => {
    const roomId = useContext(RoomIdContext);
    const updateOCs = useContext(updateOCsContext);
    const { handleSubmit, control, register, formState: { errors } } = useForm<IFormValues>({
        defaultValues: {
            cond: integratedData.conditions.map(cond => ({ setPoint: cond.setPoint }))
        }
    })

    const { fields } = useFieldArray({ control, name: "cond" })
    const conditions = fields.map((field, idx) => {
        return {
            ...field,
            ...integratedData.conditions[idx]
        }
    })
    const onSubmit = async (data: IFormValues) => {
        const mergedIntegratedData = {
            ...integratedData, conditions: integratedData.conditions.map((cond, idx) => {
                return {
                    name: cond.name,
                    current: cond.current,
                    setPoint: data.cond[idx].setPoint,
                }
            })
        }
        await setOperationConditionSgl(roomId, mergedIntegratedData);
        if (updateOCs) updateOCs();
        onCmplBtnClick();
    };

    const cancelSubmit = () => {
        onCmplBtnClick();
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ThemedTable>
                    <THead></THead>
                    <tbody>
                        {conditions.map((cond, idx) => {
                            const csInfo = csInfos.find(info => info.name === cond.name);
                            if (!csInfo) return null;
                            return (
                                <tr key={cond.id}>
                                    <td>{csInfo.logiName}</td>
                                    <td>{csInfo.getSettingCmpnt({ register, errors, index: idx, value: cond.setPoint })}</td>
                                    <td></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </ThemedTable>
                <ButtonSection>
                    <ThemedButton type="button" backgroundColor="#ff17d894" onClick={cancelSubmit}>キャンセル</ThemedButton>
                    <ThemedButton as="input" type="submit" value="完了"></ThemedButton>
                </ButtonSection>

            </form>
        </div>
    )
}