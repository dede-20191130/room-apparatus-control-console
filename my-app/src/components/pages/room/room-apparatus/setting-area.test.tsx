import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { setOperationConditionSgl } from "api/operation-condition-api/operation-condition";
import { tIntegratedDataset } from "../integrated-apparatus-dara-set";
import { SettingArea } from "./setting-area";

jest.mock("api/operation-condition-api/operation-condition", () => {
    return {
        __esModule: true,
        ...jest.requireActual("api/operation-condition-api/operation-condition"),
        setOperationConditionSgl: jest.fn()
    }
})

const onCmplBtnClick = jest.fn();

const testData: tIntegratedDataset[number] = {
    id: "",
    name: "",
    error: { isError: false, content: "" },
    settingType: "",
    conditions: [
        { name: "power-onoff", setPoint: true, current: true, },
        { name: "temperture", setPoint: 32, current: 34.6, },
    ]
}

beforeEach(() => {
    render(
        <SettingArea onCmplBtnClick={onCmplBtnClick} integratedData={testData}></SettingArea>
    )
    onCmplBtnClick.mockClear();
});

it('should decompose prop data and show', () => {
    expect(screen.getByText("スイッチ").nextElementSibling?.querySelector("input")?.checked).toBe(true);
    expect(screen.getByText("スイッチ").nextElementSibling?.nextElementSibling?.textContent).toBe("");
    expect(screen.getByText("温度").nextElementSibling?.querySelector("input")?.value).toBe("32");
    expect(screen.getByText("温度").nextElementSibling?.nextElementSibling?.textContent).toBe("");
});
it('should edit setting area and submit editted values', async () => {
    fireEvent.click(screen.getByText("スイッチ").nextElementSibling?.querySelector("input")!);
    fireEvent.input(screen.getByText("温度").nextElementSibling?.querySelector("input")!, {
        target: {
            value: "29.9",
        },
    });

    // editable
    expect(screen.getByText("スイッチ").nextElementSibling?.querySelector("input")?.checked).toBe(false);
    expect(screen.getByText("温度").nextElementSibling?.querySelector("input")?.value).toBe("29.9");

    fireEvent.submit(screen.getByRole("button", { name: "完了" }));

    // function called with editted-value
    await waitFor(() =>
        expect(setOperationConditionSgl).toHaveBeenCalledTimes(1)
    );
    expect(
        (setOperationConditionSgl as jest.Mock<any, any>).mock.calls[0][1].conditions.map((cond: any) => cond.setPoint)
    ).toEqual([false, "29.9"]);
    expect(onCmplBtnClick).toHaveBeenCalledTimes(1);


});