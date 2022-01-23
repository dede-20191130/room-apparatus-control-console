import styled, { css } from "styled-components";

export const ThemedTable = styled.table`
border: 0 none;
table-layout: fixed;
width: 90%;
border-spacing: 0;
border-collapse: collapse;
margin: 10px auto 10px auto;
empty-cells: show;
user-select: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-o-user-select: none;
-ms-user-select: none;
-webkit-touch-callout: none;
scrollbar-color: #D4AA70 #e4e4e4;
& > thead{
    & tr{
        border: 1px solid grey;
        &:last-child{
            border-bottom-width:5px;
        }
    }   
    & th{
        overflow: hidden;
        padding: .6em;
        text-align: left;
        vertical-align: middle;
        white-space: normal;
        width: auto;
        outline: 0;
    }

}
& > tbody{
    & tr{
        border: 1px solid grey;
        &:nth-child(even){
            background-color: rgb(88 88 88 / 50%);
        }
    }   
    & td{
        overflow: hidden;
        padding: .6em;
        vertical-align: middle;
        white-space: normal;
        width: auto;
        outline: 0;
    }
}
`

export const pseudoTableMixin = css`
border: 0 none;
table-layout: fixed;
border-spacing: 0;
border-collapse: collapse;
empty-cells: show;
user-select: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-o-user-select: none;
-ms-user-select: none;
-webkit-touch-callout: none;
scrollbar-color: #D4AA70 #e4e4e4;
`

export const pseudoTableRowMixin = css`
border: 1px solid grey;
&:nth-child(even){
    background-color: rgb(88 88 88 / 50%);
}
`
export const doResetPseudoTableRowMixin = css`
border:initial;
&:nth-child(even){
    background-color:initial;
}

`

export const pseudoTableCellMixin = css`
overflow: hidden;
vertical-align: middle;
white-space: normal;
width: auto;
outline: 0;

`
export const doResetPseudoTableCellMixin = css`
overflow: initial;
vertical-align: initial;
white-space: initial;
width: auto;
outline: initial;
`