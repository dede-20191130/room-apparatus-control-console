import { IOperationConditionSgl } from "api/operation-condition-api/operation-condition";
import { IRoomRoomsInfo } from "api/rooms-info-api/rooms-info";

export function composeAppaConds(myroomInfo: IRoomRoomsInfo, myOpeCond: IOperationConditionSgl) {
    return myroomInfo
        .apparatus?.map(appa => {
            return {
                id: appa.id,
                name: appa.name,
                isError: myOpeCond.apparatus
                    ?.find(_apparatus => _apparatus.id === appa.id)
                    ?.error.isError
            }
        })
}