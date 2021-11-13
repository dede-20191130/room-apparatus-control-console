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