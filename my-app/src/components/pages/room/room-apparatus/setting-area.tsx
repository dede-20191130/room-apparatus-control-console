import { setOperationConditionSgl } from "api/operation-condition-api/operation-condition";
import { useContext } from "react";
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
        await setOperationConditionSgl(roomId, mergedIntegratedData)
        onCmplBtnClick();
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table>
                    <THead></THead>
                    <tbody>
                        {conditions.map((cond, idx) => {
                            const csInfo = csInfos.find(info => info.name === cond.name);
                            if (!csInfo) return;
                            return (
                                <tr key={cond.id}>
                                    <td>{csInfo.logiName}</td>
                                    <td>{csInfo.getSettingCmpnt({ register, errors, index: idx, value: cond.setPoint })}</td>
                                    <td></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <ButtonSection>
                    <button disabled>設定変更</button>
                    <input type="submit" value="完了"></input>
                </ButtonSection>

            </form>
        </div>
    )
}