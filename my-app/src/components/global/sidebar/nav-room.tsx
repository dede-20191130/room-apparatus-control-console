import { LinkClassifiedOnActive } from "components/ui/link/link-classified-on-active"
import { parseRoomNm } from "util/manage-room-info/room-name-parser"

export const NavRoom = ({ roomId }: { roomId: string }) => {
    return (
        <li>
            <LinkClassifiedOnActive to={`/${roomId}/index`} extraMatchTgt={roomId}>{parseRoomNm(roomId)}</LinkClassifiedOnActive>
        </li>
    )
}