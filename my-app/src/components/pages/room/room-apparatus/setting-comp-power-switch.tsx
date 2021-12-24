import { ToggleCheckboxPackage } from "components/ui/form/toggle-checkbox";
import { FormState, UseFormRegister } from "react-hook-form";
import { IFormValues } from "./setting-area";

export interface ISetCompArgs {
    register: UseFormRegister<IFormValues>,
    errors: FormState<IFormValues>["errors"],
    index: number,
    value: string | boolean | number
}

export const PowerSwitch = ({ register, errors, index, value }: ISetCompArgs) => {
    // return <input
    //     type="checkbox"
    //     {...register(`cond.${index}.setPoint` as const)}
    //     defaultChecked={value as boolean}
    // />
    return <ToggleCheckboxPackage
        toggleLen={32}
        type="checkbox"
        {...register(`cond.${index}.setPoint` as const)}
        defaultChecked={value as boolean}
    ></ToggleCheckboxPackage>
}