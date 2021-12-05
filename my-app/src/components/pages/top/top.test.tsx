import { render, screen } from "@testing-library/react";
import { IOperationConditionSmmry } from "api/operation-condition-api/operation-condition";
import { IRoomsInfo } from "api/rooms-info-api/rooms-info";
import { OperationConditionSmmyContext } from "context/oc-context";
import { RoomsInfoContext } from "context/ri-context";
import { Top } from "./top";

it('should display 5 table', () => {

    const ocTestVal: IOperationConditionSmmry = {
        rooms: [
            { id: "room001", apparatus: [{ id: "test001", error: { isError: false } },] },
            { id: "room002", apparatus: [{ id: "test002", error: { isError: false } }, { id: "test003", error: { isError: false } },] },
            { id: "room003", apparatus: [{ id: "test004", error: { isError: false } },] },
            { id: "room004", apparatus: [{ id: "test006", error: { isError: false } }, { id: "test007", error: { isError: false } },] },
            { id: "room005" },
        ]
    }
    const riTestVal: IRoomsInfo = {
        rooms: [
            { id: "room001", apparatus: [{ id: "test001", name: "テスト001", settingType: "lighting01" },] },
            { id: "room002", apparatus: [{ id: "test002", name: "テスト002", settingType: "lighting01" }, { id: "test003", name: "テスト003", settingType: "lighting02" }] },
            { id: "room003", apparatus: [{ id: "test004", name: "テスト004", settingType: "lighting01" }, { id: "test005", name: "テスト005", settingType: "lighting02" }] },
            { id: "room004", apparatus: [{ id: "test006", name: "テスト006", settingType: "lighting01" }, { id: "test007", name: "テスト007", settingType: "lighting02" }] },
            { id: "room005", apparatus: [{ id: "test008", name: "テスト008", settingType: "lighting03" },] },
        ]
    }

    render(
        <OperationConditionSmmyContext.Provider value={ocTestVal}>
            <RoomsInfoContext.Provider value={riTestVal}>
                <Top></Top>
            </RoomsInfoContext.Provider>
        </OperationConditionSmmyContext.Provider>
    )

    // インジケータのボックス数
    expect(screen.getByTestId("indicator-box").children.length).toBe(9);
    // 部屋名見出しの数
    expect(screen.getAllByRole("heading", { level: 4 }).length).toBe(5);


});
it('should display 9 table when over 9 elem data is passed', () => {
    const ocTestVal: IOperationConditionSmmry = {
        rooms: [
            { id: "room001", apparatus: [{ id: "test001", error: { isError: false } },] },
            { id: "room002", apparatus: [{ id: "test002", error: { isError: false } }, { id: "test003", error: { isError: false } },] },
            { id: "room003", apparatus: [{ id: "test004", error: { isError: false } },] },
            { id: "room004", apparatus: [{ id: "test006", error: { isError: false } }, { id: "test007", error: { isError: false } },] },
            { id: "room005" },
            { id: "room006", apparatus: [{ id: "test011", error: { isError: false } },] },
            { id: "room007", apparatus: [{ id: "test012", error: { isError: false } },] },
            { id: "room008", apparatus: [{ id: "test013", error: { isError: false } },] },
            { id: "room009", apparatus: [{ id: "test014", error: { isError: false } },] },
            { id: "room010", apparatus: [{ id: "test015", error: { isError: false } },] },
        ]
    }
    const riTestVal: IRoomsInfo = {
        rooms: [
            { id: "room001", apparatus: [{ id: "test001", name: "テスト001", settingType: "lighting01" },] },
            { id: "room002", apparatus: [{ id: "test002", name: "テスト002", settingType: "lighting01" }, { id: "test003", name: "テスト003", settingType: "lighting02" }] },
            { id: "room003", apparatus: [{ id: "test004", name: "テスト004", settingType: "lighting01" }, { id: "test005", name: "テスト005", settingType: "lighting02" }] },
            { id: "room004", apparatus: [{ id: "test006", name: "テスト006", settingType: "lighting01" }, { id: "test007", name: "テスト007", settingType: "lighting02" }] },
            { id: "room005", apparatus: [{ id: "test008", name: "テスト008", settingType: "lighting03" },] },
            { id: "room006", apparatus: [{ id: "test011", name: "テスト011", settingType: "lighting03" },] },
            { id: "room007", apparatus: [{ id: "test012", name: "テスト012", settingType: "lighting03" },] },
            { id: "room008", apparatus: [{ id: "test013", name: "テスト013", settingType: "lighting03" },] },
            { id: "room009", apparatus: [{ id: "test014", name: "テスト014", settingType: "lighting03" },] },
            { id: "room010", apparatus: [{ id: "test015", name: "テスト015", settingType: "lighting03" },] },
        ]
    }

    render(
        <OperationConditionSmmyContext.Provider value={ocTestVal}>
            <RoomsInfoContext.Provider value={riTestVal}>
                <Top></Top>
            </RoomsInfoContext.Provider>
        </OperationConditionSmmyContext.Provider>
    )

    // インジケータのボックス数
    expect(screen.getByTestId("indicator-box").children.length).toBe(9);
    // 部屋名見出しの数
    expect(screen.getAllByRole("heading", { level: 4 }).length).toBe(9);
});