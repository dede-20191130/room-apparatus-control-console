import { Link } from "react-router-dom"
import { parseRoomNm } from "util/manage-room-info/room-name-parser"

export const NavRoom = ({ roomId }: { roomId: string }) => {
    return (
        <li>
            <Link to={`/${roomId}/index`}>{parseRoomNm(roomId)}</Link>
        </li>
    )
}