import { IRoomsInfo } from "api/rooms-info-api/rooms-info";
import { getApparatusNames } from "./apparatus-names";

let roomsInfo: IRoomsInfo;

it('should return apparatus-name array when 1 apparatus exists ', () => {
    roomsInfo = {
        rooms: [
            { id: "room001", apparatus: [{ id: "test001", name: "テスト001", settingType: "lighting01" },] },
            { id: "room002", apparatus: [{ id: "test002", name: "テスト002", settingType: "lighting01" }, { id: "test003", name: "テスト003", settingType: "lighting02" }] },
        ]
    }
    const names = getApparatusNames(roomsInfo.rooms[0]);
    // non-nullability
    expect(names).toBeDefined();
    // 配列の要素数
    expect(names?.length).toBe(1);
    // ID、名前の格納
    expect(names?.[0].id).toBe("test001");
    expect(names?.[0].name).toBe("テスト001");

});
it('should return apparatus-name array when 10 apparatus exist', () => {
    roomsInfo = {
        rooms: [
            { id: "room001", apparatus: [{ id: "test001", name: "テスト001", settingType: "lighting01" },] },
            {
                id: "room002",
                apparatus: [
                    { id: "test002", name: "テスト002", settingType: "lighting01" },
                    { id: "test003", name: "テスト003", settingType: "lighting02" },
                    { id: "test004", name: "テスト004", settingType: "lighting02" },
                    { id: "test005", name: "テスト005", settingType: "lighting02" },
                    { id: "test006", name: "テスト006", settingType: "lighting02" },
                    { id: "test007", name: "テスト007", settingType: "lighting04" },
                    { id: "test008", name: "テスト008", settingType: "lighting05" },
                    { id: "test009", name: "テスト009", settingType: "lighting06" },
                    { id: "test010", name: "テスト010", settingType: "lighting07" },
                    { id: "test011", name: "テスト011", settingType: "lighting08" },
                ]
            },
        ]
    }
    const names = getApparatusNames(roomsInfo.rooms[1]);
    // 配列の要素数
    expect(names?.length).toBe(10);
    // ID、名前の格納
    expect(names?.[0].id).toBe("test002");
    expect(names?.[0].name).toBe("テスト002");
    expect(names?.[9].id).toBe("test011");
    expect(names?.[9].name).toBe("テスト011");
});
it('should return nullable when no aooaratus exists', () => {
    roomsInfo = {
        rooms: [
            { id: "room001" },
            { id: "room002", apparatus: [{ id: "test002", name: "テスト002", settingType: "lighting01" }, { id: "test003", name: "テスト003", settingType: "lighting02" }] },
        ]
    }
    const names = getApparatusNames(roomsInfo.rooms[0]);
    // nullability
    expect(names).not.toBeDefined();

});