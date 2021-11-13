import { parseRoomNm } from "./room-name-parser";

describe('regexp in parser', () => {
    it('should return "ROOM [Number after string ROOM]"', () => {

        expect(parseRoomNm("room1")).toBe("ROOM 1");
        expect(parseRoomNm("room1234")).toBe("ROOM 1234");
    });
    it('should return "ROOM No Name" when no-match with regexp', () => {
        expect(parseRoomNm("room-one-two")).toBe("ROOM No Name");
        expect(parseRoomNm("room1234-22")).toBe("ROOM No Name");

    });

});