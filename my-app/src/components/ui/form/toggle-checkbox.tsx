import React from "react"
import styled, { } from "styled-components"

interface IToggleCheckboxPackageProps {
    readonly toggleLen?: number;
}

const ContainerSpan = styled.span<IToggleCheckboxPackageProps>`
--toggle-color-button-criteria-len:${props => `${props.toggleLen || 75}px`};
display: inline-block;
position: relative;
width: var(--toggle-color-button-criteria-len);
height: calc(var(--toggle-color-button-criteria-len) / 1.78);
margin: auto;
vertical-align: middle;
& > label{
    width: 100%;
    height: 100%;
    background: #ffffff;
    position: relative;
    display: inline-block;
    border-radius: calc(var(--toggle-color-button-criteria-len)/1.63);
    transition: 0.4s;
    box-sizing: border-box;
    &::after {
        content: '🟢';
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        transition: 0.4s;
        font-size: calc(var(--toggle-color-button-criteria-len)/2.5);
        line-height: calc(var(--toggle-color-button-criteria-len)/1.70);
    }
}
& > input{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin:0;
    z-index: 5;
    opacity: 0;
    cursor: pointer;
    &:checked + label {
        background-color: #00ff37;
    }
    &:checked + label::after {
        content: '🟢';
        left: calc(var(--toggle-color-button-criteria-len) / 2.14);
    }
}
`

type tInputProps = JSX.IntrinsicElements["input"];
export const ToggleCheckboxPackage = React.forwardRef<HTMLInputElement, tInputProps & IToggleCheckboxPackageProps>(({ toggleLen, ...rest }: IToggleCheckboxPackageProps, ref) => {
    return (
        <ContainerSpan toggleLen={toggleLen}>
            <input type='checkbox' {...rest} ref={ref} />
            <label />
        </ContainerSpan>
    )
})