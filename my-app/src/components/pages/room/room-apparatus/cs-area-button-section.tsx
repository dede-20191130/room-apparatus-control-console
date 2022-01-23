import styled from "styled-components";

const FlexContainerSection = styled.section`
display:flex;
justify-content:flex-end;
& button,input{
    margin:10px;
}
`

export const ButtonSection = ({ children }: { children: React.ReactNode }) => {
    return (
        <FlexContainerSection>{children}</FlexContainerSection>
    )
}