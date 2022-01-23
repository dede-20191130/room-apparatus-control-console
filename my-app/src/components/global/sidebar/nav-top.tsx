import { LinkClassifiedOnActive } from "components/ui/link/link-classified-on-active"

export const NavTop = () => {
    return (
        <li>
            <LinkClassifiedOnActive to="/top" extraMatchTgt="top">TOP</LinkClassifiedOnActive>
        </li>
    )
}