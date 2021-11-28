import React, { } from "react";
import { IOperationConditionSmmry } from "api/operation-condition-api/operation-condition";
import { useIsError } from "./alert-indicate";

const operationConditionAll: IOperationConditionSmmry = {
    rooms: [
        {
            id: "rTest001",
            apparatus: [
                { id: "aTest001", error: { isError: false } },
                { id: "aTest002", error: { isError: false } },
            ]
        },
        {
            id: "rTest002",
            apparatus: [
                { id: "aTest003", error: { isError: false } },
                { id: "aTest004", error: { isError: false } },
                { id: "aTest005", error: { isError: false } },
            ]

        },
        {
            id: "rTest003"

        }
    ]
}

let originalReactUseContext = React.useContext;

describe('isError with context mock', () => {

    afterEach(() => {
        React.useContext = originalReactUseContext;
    });

    it('Should be false when no error', () => {
        React.useContext = jest.fn().mockImplementation(() => Object.assign({}, operationConditionAll));
        expect(useIsError()).toBe(false);
    });

    it('Should be true when single error exitsts', () => {
        const currentCond = Object.assign({}, operationConditionAll);
        currentCond.rooms[0].apparatus![0].error.isError = true;
        React.useContext = jest.fn().mockImplementation(() => currentCond);
        expect(useIsError()).toBe(true);
    });
});
