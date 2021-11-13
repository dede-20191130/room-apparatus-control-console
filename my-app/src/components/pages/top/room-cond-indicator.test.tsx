import { render, screen } from "@testing-library/react";
import { RoomCondIndicator } from "./room-cond-indicator";
import { tRoomCondInfos } from "./room-cond-info-hook";

it('should indicate patterns: [normal, error, not-exist] ', () => {
    const roomCondInfo: tRoomCondInfos[number] = {
        id: "room008",
        apparatus: [
            {
                id: "test001",
                name: "エアコン",
                error: {
                    isError: false
                }
            },
            {
                id: "test002",
                name: "照明",
                error: {
                    isError: true
                }
            },
            {
                id: "test003",
                name: "除湿機",
                error: undefined,
            },
        ]
    }
    render(
        <>
            <RoomCondIndicator roomCondInfo={roomCondInfo}></RoomCondIndicator>
        </>
    );
    // 行数
    expect(screen.getAllByRole("row").length).toBe(3);
    // 各機器ごとの状況表示
    expect(screen.getByText("エアコン").nextElementSibling?.textContent).toBe("正常");
    expect(screen.getByText("照明").nextElementSibling?.textContent).toBe("異常");
    expect(screen.getByText("除湿機").nextElementSibling?.textContent).toBe("-");


});
it('should display no-information-indicator', () => {
    const roomCondInfo: tRoomCondInfos[number] = {
        id: "room008",
        apparatus: undefined
    }
    render(
        <>
            <RoomCondIndicator roomCondInfo={roomCondInfo}></RoomCondIndicator>
        </>
    );
    // 行数
    expect(screen.getAllByRole("row").length).toBe(1);
    // 機器運転情報無し
    expect(screen.getByText("機器運転情報無し")).toBeInTheDocument();

});