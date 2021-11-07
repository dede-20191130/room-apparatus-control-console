import { useIsError } from "./alert-indicate"

export const AlertIndicator = () => {
    const isError = useIsError();

    return (
        <div className={isError ? "normal" : "error"}></div>
    )
}