import { OperationConditionSmmyContext } from "context/oc-context";
import { RoomsInfoContext } from "context/ri-context";
import { useContext } from "react";

export function useRoomCondInfos() {
    const ocCnxt = useContext(OperationConditionSmmyContext);
    const riCnxt = useContext(RoomsInfoContext);
    if(!(ocCnxt && riCnxt))return null;
    return riCnxt?.rooms?.map((room) => {
        return {
            "id": room.id,
            "apparatus": room.apparatus?.map(apparatus => {
                return {
                    id: apparatus.id,
                    name: apparatus.name,
                    error: ocCnxt.rooms
                        .find(_room => _room.id === room.id)
                        ?.apparatus
                        ?.find(_apparatus => _apparatus.id === apparatus.id)
                        ?.error
                }
            })
        }
    })
}
export type tRoomCondInfos = NonNullable<ReturnType<typeof useRoomCondInfos>>;