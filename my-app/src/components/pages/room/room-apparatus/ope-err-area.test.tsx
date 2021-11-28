import { waitFor, render, screen, fireEvent } from "@testing-library/react";
import * as OperationCondition from "api/operation-condition-api/operation-condition";
import { tIntegratedDataset } from "../integrated-apparatus-dara-set";
import { OpeErrorArea } from "./ope-err-area";

// jest.mock("api/operation-condition-api/operation-condition", () => {
//     return {
//         __esModule: true,
//         ...jest.requireActual("api/operation-condition-api/operation-condition"),
//         recoverOpeError: jest.fn()
//     }
// })

let testData: tIntegratedDataset[number];
let rerender: any



beforeEach(() => {
    testData = {
        id: "test-apparatus-001",
        name: undefined,
        error: { isError: false, content: "" },
        settingType: undefined,
        conditions: []
    };
    ({ rerender } = render(
        <OpeErrorArea integratedData={testData}></OpeErrorArea>
    ));

});

it('should not show error manageing area on normal condition', () => {
    expect(screen.getByText("ステータス").nextElementSibling?.textContent).toBe("正常");
    expect(screen.queryByText("状況")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "復旧" })).not.toBeInTheDocument();
});
it('should show error manageing area on error condition', () => {
    testData.error.isError = true;
    testData.error.content = "test error message";
    rerender(<OpeErrorArea integratedData={testData}></OpeErrorArea>);
    expect(screen.getByText("ステータス").nextElementSibling?.textContent).toBe("エラー");
    expect(screen.getByText("状況")).toBeInTheDocument();
    expect(screen.getByText("test error message")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "復旧" })).toBeInTheDocument();
});
it('should recover error and diminish error indication', async () => {
    jest.spyOn(OperationCondition, 'recoverOpeError')
        .mockImplementation(async (a: string, b: string) => {
            testData.error.isError = false;
            rerender(<OpeErrorArea integratedData={testData}></OpeErrorArea>);
            return null as unknown as number;
        });
    testData.error.isError = true;
    testData.error.content = "test error message";
    rerender(<OpeErrorArea integratedData={testData}></OpeErrorArea>);
    fireEvent.click(screen.getByRole("button", { name: "復旧" }));
    await waitFor(() =>
        expect(OperationCondition.recoverOpeError).toHaveBeenCalledTimes(1)
    );
    // resolve error
    expect(screen.getByText("ステータス").nextElementSibling?.textContent).toBe("正常");
    expect(screen.queryByText("状況")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "復旧" })).not.toBeInTheDocument();
});