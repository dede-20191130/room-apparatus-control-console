import { useContext } from "react";
import { OperationConditionAllContext } from "../../../context/oc-context";

export function useIsError() {
    const opeCondAlls = useContext(OperationConditionAllContext);
    // 配列からnullableな値の除去をtype情報に伝える
    // https://zenn.dev/lollipop_onl/articles/eoz-ts-non-nullable
    const apparatusArr = opeCondAlls.rooms
        .map(item => item.apparatus)
        .filter((item): item is NonNullable<typeof item> => !!item);
    for (const apparatus of apparatusArr) {
        const errvals = apparatus.map(item => item.error.isError);
        if (errvals.includes(true)) return true;
    }
    return false;
}