import { RoomsInfoContext } from "context/ri-context";
import { useContext } from "react";

export function useCreateList() {
    const roomsInfo = useContext(RoomsInfoContext);
    return roomsInfo.rooms.map(room => room.id);
}