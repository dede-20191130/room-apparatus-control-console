import styled from "styled-components";
import { useIsError } from "./alert-indicate"

const StyledDiv=styled.div`
width: 160px;
margin-right:20px;
padding: 2px;
border: 5px double green;
border-radius: 5px;
text-align: center;
`

export const AlertIndicator = () => {
    const isError = useIsError();

    return (
        <StyledDiv className={!isError ? "normal" : "error"}>{!isError ? "🟢 正常" : "🔥 エラー"}</StyledDiv>
    )
}