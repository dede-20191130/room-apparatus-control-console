import { waitFor, render, screen, fireEvent } from "@testing-library/react";
import { IRoomsInfo } from "api/rooms-info-api/rooms-info";
import { RoomsInfoContext } from "context/ri-context";
import { RoomFrame } from "./room-frame";
import * as OpeCondMdl from "api/operation-condition-api/operation-condition"
import { MemoryRouter } from "react-router";

const testDataRoomInfo: IRoomsInfo = {
    rooms: [
        {
            id: "room123",
            apparatus: [
                { id: "test-app-01", name: "照明器具", settingType: "" },
                { id: "test-app-02", name: "除湿機", settingType: "" },
            ]
        }
    ]
}



beforeEach(() => {
    jest.spyOn(OpeCondMdl, 'getOperationConditionSgl')
        .mockImplementation((roomId: string) => {
            const operationConditionSgl: OpeCondMdl.IOperationConditionSgl = {
                apparatus: [
                    {
                        id: "test-app-01",
                        conditions: [
                            { name: "power-onoff", current: true, setPoint: true },
                            { name: "temperture", current: 34.0, setPoint: 33.0 },
                        ],
                        error: { isError: false, content: "" }
                    },
                    {
                        id: "test-app-02",
                        conditions: [
                            { name: "power-onoff", current: true, setPoint: true },
                        ],
                        error: { isError: true, content: "test-error-message" }
                    }
                ]
            }
            return operationConditionSgl
        });

});

it('should jump room index page', () => {
    render(
        <MemoryRouter initialEntries={["/index"]}>
            <RoomsInfoContext.Provider value={testDataRoomInfo}>
                <RoomFrame roomId="room123"></RoomFrame>

            </RoomsInfoContext.Provider>

        </MemoryRouter>
    )
    expect(screen.getByText(/.*運転状況概要/)).toBeInTheDocument();
});
it('should jump each apparatus page', () => {
    render(
        <MemoryRouter initialEntries={["/index"]}>
            <RoomsInfoContext.Provider value={testDataRoomInfo}>
                <RoomFrame roomId="room123"></RoomFrame>

            </RoomsInfoContext.Provider>

        </MemoryRouter>
    )
    fireEvent.click(screen.getByRole("link", { name: "照明器具" }));
    expect(screen.getByRole("heading",{level:3,name:"照明器具"})).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: "除湿機" }));
    expect(screen.getByRole("heading",{level:3,name:"除湿機"})).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: "インデックス" }));
    expect(screen.getByText(/.*運転状況概要/)).toBeInTheDocument();
    
});
it('should show no-content-area when no room info is given', () => {
    const anotherTestDataRoomInfo: IRoomsInfo = {
        rooms: [
            {
                id: "room200",
                apparatus: [
                    { id: "test-app-01", name: "照明器具", settingType: "" },
                    { id: "test-app-02", name: "除湿機", settingType: "" },
                ]
            }
        ]
    }
    render(
        <MemoryRouter initialEntries={["/index"]}>
            <RoomsInfoContext.Provider value={anotherTestDataRoomInfo}>
                <RoomFrame roomId="room123"></RoomFrame>

            </RoomsInfoContext.Provider>

        </MemoryRouter>
    )
    expect(screen.getByText("部屋情報が見つかりませんでした。")).toBeInTheDocument();
    
});