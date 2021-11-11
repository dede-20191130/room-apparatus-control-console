import { useContext } from "react";
import { RoomsInfoContext } from "../../../context/ri-context";

export function useCreateList() {
    const roomsInfo = useContext(RoomsInfoContext);
    return roomsInfo.rooms.map(room => room.id);
}