import { Link } from "react-router-dom"

export const NavRoom = ({ roomId }: { roomId: string }) => {
    return (
        <li>
            <Link to={`/${roomId}/index`}></Link>
        </li>
    )
}