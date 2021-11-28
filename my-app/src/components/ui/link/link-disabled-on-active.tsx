import { Link, useLocation } from "react-router-dom"

export const LinkDisabledOnActive = ({ to, children, ...rest }: { to: string, children?: React.ReactNode, }) => {
    const location = useLocation()
    return (
        <>
            {location.pathname === to
                ? <span>{children}</span>
                : <Link to={to} {...rest}>{children}</Link>
            }

        </>

    )

}