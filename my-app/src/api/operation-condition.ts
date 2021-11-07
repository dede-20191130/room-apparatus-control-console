export interface IOperationConditionAll {
    rooms: IRoomOperationConditionAll[];
}

export interface IRoomOperationConditionAll {

    id: string,
    apparatus?: IApparatusOperationConditionAll[];

}

export interface IApparatusOperationConditionAll {
    id: string,
    error: {
        isError: boolean
    }
}