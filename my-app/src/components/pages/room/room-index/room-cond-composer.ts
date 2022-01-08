import { IApparatusOperationConditionSgl, IOperationConditionSgl } from "api/operation-condition-api/operation-condition";
import { IApparatusRoomsInfo, IRoomRoomsInfo } from "api/rooms-info-api/rooms-info";
import { ReactComponent as CeilingLampSvg } from './ceiling-lamp-svgrepo-com.svg'
import { ReactComponent as AirConditionerSvg } from './air-conditioner-svgrepo-com.svg'
import { ReactComponent as HumidifierSvg } from './humidifier-svgrepo-com.svg'
import { ReactComponent as DehumidifierSvg } from './icon-dehumidifier-line.svg'
import { ReactComponent as UnderfloorHeaterSvg } from './underfloor-heating-svgrepo-com.svg'
import { ReactComponent as BlowerSvg } from './fan-black-silhouette-svgrepo-com.svg'

type tAppaSvgInfoObj = Record<string, {
    SvgComp: React.FunctionComponent<any>,
    xCood: number,
    yCood: number,
}>
const appaSvgInfoObj: tAppaSvgInfoObj = {
    "lighting": {
        SvgComp: CeilingLampSvg,
        xCood: 50,
        yCood: 0,
    },
    "air-conditioner": {
        SvgComp: AirConditionerSvg,
        xCood: 5,
        yCood: 5,
    },
    "humidifier": {
        SvgComp: HumidifierSvg,
        xCood: 20,
        yCood: 60,
    },
    "dehumidifier": {
        SvgComp: DehumidifierSvg,
        xCood: 20,
        yCood: 60,
    },
    "floor-heating": {
        SvgComp: UnderfloorHeaterSvg,
        xCood: 50,
        yCood: 80,
    },
    "blower": {
        SvgComp: BlowerSvg,
        xCood: 80,
        yCood: 5,
    },
}

export type tAppaCondsGrpObj = tAppaSvgInfoObj[string] & {
    appaData: (IApparatusRoomsInfo & Pick<IApparatusOperationConditionSgl["error"], "isError">)[]
};
export function composeAppaConds(myroomInfo: IRoomRoomsInfo, myOpeCond: IOperationConditionSgl) {
    return myroomInfo
        .apparatus
        ?.reduce((newObj, currAppa) => {
            const isError = myOpeCond.apparatus
                ?.find(_apparatus => _apparatus.id === currAppa.id)
                ?.error.isError || false;

            const key = currAppa.settingType
            if (!newObj[key]) newObj[key] = {} as tAppaCondsGrpObj;
            newObj[key].SvgComp = appaSvgInfoObj[currAppa.settingType].SvgComp;
            newObj[key].xCood = appaSvgInfoObj[currAppa.settingType].xCood;
            newObj[key].yCood = appaSvgInfoObj[currAppa.settingType].yCood;

            (newObj[key].appaData || (newObj[key].appaData = []))!.push({
                ...currAppa,
                isError
            });

            return newObj;
        }, {} as Record<string, tAppaCondsGrpObj>);

}