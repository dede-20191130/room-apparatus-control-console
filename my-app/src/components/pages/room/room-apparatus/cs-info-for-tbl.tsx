import { Humidity } from "./setting-comp-humidity";
import { Illuminance } from "./setting-comp-Illuminance";
import { ISetCompArgs, PowerSwitch } from "./setting-comp-power-switch";
import { Temperture } from "./setting-comp-temperture";

type tCsInfo = Readonly<{
    name: string
    logiName: string;
    attachDisplayNm(val: boolean | number | string): string;
    getSettingCmpnt(args: ISetCompArgs): JSX.Element;
}>;
export const csInfos: tCsInfo[] = [
    {
        name: "power-onoff",
        logiName: "スイッチ",
        attachDisplayNm: (val: boolean) => val ? "ON" : "OFF",
        getSettingCmpnt: ({ register, errors, index, value }) => (
            <PowerSwitch register={register} errors={errors}
                index={index} value={value}></PowerSwitch>
        )
    },
    {
        name: "illuminance",
        logiName: "照度",
        attachDisplayNm: (val: number) => `${val} lx`,
        getSettingCmpnt: ({ register, errors, index, value }) => (
            <Illuminance register={register} errors={errors}
                index={index} value={value}></Illuminance>
        )
    },
    {
        name: "temperture",
        logiName: "温度",
        attachDisplayNm: (val: number) => `${val} °C`,
        getSettingCmpnt: ({ register, errors, index, value }) => (
            <Temperture register={register} errors={errors}
                index={index} value={value}></Temperture>
        )
    },
    {
        name: "humidity",
        logiName: "湿度",
        attachDisplayNm: (val: number) => `${val} %`,
        getSettingCmpnt: ({ register, errors, index, value }) => (
            <Humidity register={register} errors={errors}
                index={index} value={value}></Humidity>
        )
    },
]