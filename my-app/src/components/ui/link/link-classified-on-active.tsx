import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"

export const LinkClassifiedOnActive = (
    { to, children, extraMatchTgt, ...rest }: { to: string, children?: React.ReactNode, extraMatchTgt?: string }
) => {
    const location = useLocation();
    const isActiveCustom = location.pathname.split("/").includes(extraMatchTgt ? extraMatchTgt : to);
    return (
        <Link to={to}
            className={isActiveCustom ? "nav-active" : "nav-normal"}
            {...rest}

        >
            {children}
        </Link>
    )

}