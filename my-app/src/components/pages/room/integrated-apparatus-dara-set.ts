import { IOperationConditionSgl } from "api/operation-condition-api/operation-condition";
import { IRoomRoomsInfo } from "api/rooms-info-api/rooms-info";

export function getIntegratedDataset(myroomInfo: IRoomRoomsInfo, myOpeCond: IOperationConditionSgl) {
    return myOpeCond.apparatus.map(appa => {
        const appaOfRI = myroomInfo.apparatus?.find(_appa => _appa.id === appa.id);
        return {
            id: appa.id,
            name: appaOfRI?.name,
            settingType: appaOfRI?.settingType,
            conditions: appa.conditions,
            error: appa.error
        }
    })
}

export type tIntegratedDataset = ReturnType<typeof getIntegratedDataset>;