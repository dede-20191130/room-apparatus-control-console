export function parseRoomNm(roomId: string) {
    const roomIdNum = roomId.match(/(\d+)$/i);
    return `ROOM ${roomIdNum ? roomIdNum[1] : "No Name"}`;
}