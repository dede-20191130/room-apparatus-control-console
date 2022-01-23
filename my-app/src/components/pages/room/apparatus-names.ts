import { IRoomRoomsInfo } from "api/rooms-info-api/rooms-info";

export function getApparatusNames(roomRoomsInfo: IRoomRoomsInfo) {
    return roomRoomsInfo
        ?.apparatus
        ?.map(appa => { return { id: appa.id, name: appa.name } });
}