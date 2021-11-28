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
    // todo 実装
    return null as unknown as IOperationConditionAll;
}

export function getOperationConditionSgl(roomId: string): IOperationConditionSgl | undefined {
    // todo 実装
    return null as unknown as IOperationConditionSgl;
}

export async function setOperationConditionSgl(roomId: string, cond: IApparatusOperationConditionSgl): Promise<number> {
    // todo 実装
    return null as unknown as number;
}

export async function recoverOpeError(roomId: string, apparatusId: string): Promise<number> {
    // todo 実装
    return null as unknown as number;
}