import { doPseudoFetch } from "api/pseudo-fetch-and-stock-webstorage/pseudo-fetch-and-stock-webstorage";

export interface IOperationConditionAll {
    rooms: IRoomOperationConditionAll[];
}

export interface IRoomOperationConditionAll {
    id: string,
    apparatus?: IApparatusOperationConditionSgl[];
}


export interface IOperationConditionSmmry {
    rooms: IRoomOperationConditionSmmry[];
}

export interface IRoomOperationConditionSmmry {

    id: string,
    apparatus?: IApparatusOperationConditionSmmry[];

}

export interface IApparatusOperationConditionSmmry {
    id: string,
    error: {
        isError: boolean
    }
}

export interface IOperationConditionSgl {
    apparatus: IApparatusOperationConditionSgl[];
}


export interface IApparatusOperationConditionSgl {
    id: string,
    conditions: ICondSgl[],
    error: {
        isError: boolean,
        content: string
    }
}

export interface ICondSgl {
    name: string,
    current: string | boolean | number,
    setPoint: string | boolean | number,

}



export async function fetchOperationConditionAll(): Promise<IOperationConditionAll> {
    const res = await doPseudoFetch("/api/ope-cond/rooms");
    return (await res.json()) as IOperationConditionAll;
}

export function getOperationConditionSgl(roomId: string): IOperationConditionSgl | undefined {
    // todo 実装
    // 本当にこれは必要？contextで渡せば必要ないかもしれない
    return null as unknown as IOperationConditionSgl;
}

export async function setOperationConditionSgl(roomId: string, cond: IApparatusOperationConditionSgl): Promise<number> {
    const res = await doPseudoFetch(
        `/api/ope-cond/rooms/${roomId}/apparatus/${cond.id}`,
        {
            method: "PATCH",
            body: JSON.stringify({
                "conditions": cond.conditions.map(sglCond => ({
                    "name": sglCond.name,
                    "set-point": sglCond.setPoint,
                }))
            })
        }
    );
    return res.status;
}

export async function recoverOpeError(roomId: string, apparatusId: string): Promise<number> {
    const res = await doPseudoFetch(
        `/api/ope-cond/rooms/${roomId}/apparatus/${apparatusId}`,
        {
            method: "PATCH",
            body: JSON.stringify({
                "recover": true
            })
        }
    );
    return res.status;
}