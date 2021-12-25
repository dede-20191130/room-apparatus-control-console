import { ThemedTextbox } from "components/ui/form/themed-textbox";
import { ISetCompArgs } from "./setting-comp-power-switch";


export const Humidity = ({ register, errors, index, value }: ISetCompArgs) => {
    return <ThemedTextbox
        type="number"
        {...register(`cond.${index}.setPoint` as const, {
            required: true,
        })}
        step={0.1}
        className={errors?.cond?.[index]?.setPoint ? "error" : ""}
        defaultValue={value as number}
    />
}