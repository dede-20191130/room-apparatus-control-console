import { doPseudoFetch } from "api/pseudo-fetch-and-stock-webstorage/pseudo-fetch-and-stock-webstorage";

export interface IRoomsInfo {
    rooms: IRoomRoomsInfo[];
}

export interface IRoomRoomsInfo {

    id: string,
    apparatus?: IApparatusRoomsInfo[];

}

export interface IApparatusRoomsInfo {
    id: string,
    name: string,
    settingType: string
}

export async function fetchRoomInfo(): Promise<IRoomsInfo> {
    const res = await doPseudoFetch("/api/info/rooms");
    return (await res.json()) as IRoomsInfo;
}