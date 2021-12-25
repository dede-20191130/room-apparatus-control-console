import { IOperationConditionAll } from "api/operation-condition-api/operation-condition";
import { ThemedButton } from "components/ui/button/themed-button";
import { updateOCsContext } from "context/oc-context"
import { useContext } from "react"
import { useIsError } from "./alert-indicate";

// エラー同時発生最大数
const MAX_CONCURRENT_ERR_NUM = 3
// エラー文言
const ERR_TXT = `（試験用エラーです）
機器にエラーが発生しました。
復旧ボタンにより機器を正常復旧してください。
`

interface IError {
    isError: boolean,
    content: string
}

function induceError() {
    const opeCondInfo = JSON.parse(sessionStorage.getItem("opeCondInfo") || "null") as IOperationConditionAll | null;
    if (!opeCondInfo) return;
    const errObjs = getAllErrObjs(opeCondInfo);
    setSomeErrs(errObjs);
    sessionStorage.setItem("opeCondInfo", JSON.stringify(opeCondInfo));
}

function getAllErrObjs(opeCondInfo: IOperationConditionAll) {
    const errObjs: IError[] = [];
    for (const room of opeCondInfo.rooms) {
        if (!room.apparatus) continue;
        for (const appa of room.apparatus) {
            errObjs.push(appa.error);
        }
    }
    return errObjs;
}

function setSomeErrs(errObjs: IError[]) {

    function resetPointer() {
        return Math.ceil(Math.random() * errObjs.length) - 1;
    }

    // エラー発生数
    const errNum = Math.ceil(Math.random() * Math.min(MAX_CONCURRENT_ERR_NUM, errObjs.length));

    let count = errNum;
    let pointer = resetPointer();
    while (count > 0) {
        let tgtErr = errObjs[pointer];
        if (tgtErr.isError) {
            pointer++;
            if (pointer > errObjs.length - 1) pointer = 0;
            continue;
        }
        tgtErr.isError = true;
        tgtErr.content = ERR_TXT;
        pointer = resetPointer();
        count--;
    }
}

export const AlertGenerator = () => {
    const isError = useIsError();
    const updateOCs = useContext(updateOCsContext);
    const handleClick = async () => {
        induceError();
        if (updateOCs) await updateOCs();
    }

    return (
        <div>
            <ThemedButton disabled={isError} onClick={() => handleClick()}>エラー発生（試験）</ThemedButton>
        </div >
    )
}