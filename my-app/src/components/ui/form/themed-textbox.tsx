import React from "react";
import styled from "styled-components";

const StyledInputForThemedTextbox = styled.input`
border: 1px solid #dee2e6;
border-radius: 4px;
outline: none;
&:focus{
    border-width:2px;
    border-color: #86b7fe;
}
`

type tInputProps = JSX.IntrinsicElements["input"];
export const ThemedTextbox = React.forwardRef<HTMLInputElement, tInputProps>(({ ...rest }, ref) => {
    return (
        <StyledInputForThemedTextbox type='text' {...rest} ref={ref}></StyledInputForThemedTextbox>
    )
});