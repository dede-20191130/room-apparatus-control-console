export function parseRoomNm(roomId: string) {
    let roomIdNum
    try {
        roomIdNum = roomId.match(/(?<=room)(\d+)$/i);
    } catch (error) {
        if (error instanceof SyntaxError) {
            roomIdNum = roomId.match(/(\d+)$/i);
        } else {
            throw error;
        }
    }
    return `ROOM ${roomIdNum ? roomIdNum[1] : "No Name"}`;
}