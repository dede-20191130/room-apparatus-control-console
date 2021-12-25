import { ThemedTextbox } from "components/ui/form/themed-textbox";
import { ISetCompArgs } from "./setting-comp-power-switch";


export const Illuminance = ({ register, errors, index, value }: ISetCompArgs) => {
    return <ThemedTextbox
        type="number"
        {...register(`cond.${index}.setPoint` as const, {
            required: true,
            min: 0,
            pattern: /[0-9]+/
        })}
        className={errors?.cond?.[index]?.setPoint ? "error" : ""}
        defaultValue={value as number}
    />
}