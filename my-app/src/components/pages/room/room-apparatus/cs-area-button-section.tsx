import { useState } from "react";
import styled from "styled-components";
import { tIntegratedDataset } from "../integrated-apparatus-dara-set";

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