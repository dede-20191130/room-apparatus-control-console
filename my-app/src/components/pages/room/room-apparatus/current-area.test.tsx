import { fireEvent, render, screen } from "@testing-library/react";
import { tIntegratedDataset } from "../integrated-apparatus-dara-set";
import { CurrentArea } from "./current-area";

const onCngbtnClickMock = jest.fn();

const testData: tIntegratedDataset[number] = {
    id: "",
    name: "",
    error: { isError: false, content: "" },
    settingType: "",
    conditions: [
        { name: "power-onoff", setPoint: true, current: false, },
        { name: "temperture", setPoint: 32, current: 34.6, },
    ]
}

beforeEach(() => {
    render(
        <CurrentArea onCngbtnClick={onCngbtnClickMock} integratedData={testData}></CurrentArea>
    )
    onCngbtnClickMock.mockClear();
});

it('should decompose prop data and show', () => {
    expect(screen.getByText("スイッチ").nextElementSibling?.textContent).toBe("ON");
    expect(screen.getByText("スイッチ").nextElementSibling?.nextElementSibling?.textContent).toBe("OFF");
    expect(screen.getByText("温度").nextElementSibling?.textContent).toBe("32.0 °C");
    expect(screen.getByText("温度").nextElementSibling?.nextElementSibling?.textContent).toBe("34.6 °C");
});
it('should fire parent component handler', () => {
    fireEvent.click(screen.getByRole("button", { name: "設定変更" }))
    expect(onCngbtnClickMock).toHaveBeenCalledTimes(1);
});