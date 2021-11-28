import { RoomCondIndicator } from "./room-cond-indicator";
import { tRoomCondInfos, useRoomCondInfos } from "./room-cond-info-hook"

export const Top = () => {
    const roomCondIndicators = convInfosTo9ElemJSXes(useRoomCondInfos());
    return (
        <div>
            <div>
                <h3>各室運転状況インジケータ</h3>
            </div>
            <div data-testid="indicator-box">
                {roomCondIndicators}
            </div>
        </div>
    )
}

function convInfosTo9ElemJSXes(infos: tRoomCondInfos) {

    // infoオブジェクトをJSXにマッピング
    const roomCondIndicators = infos.map(info => (
        <div key={info.id}>
            <RoomCondIndicator roomCondInfo={info}></RoomCondIndicator>
        </div>
    ));

    // 最大表示数は9
    if (roomCondIndicators.length > 9) {
        return roomCondIndicators.slice(0, 9)
    }
    // 9要素以下であれば空のdivで埋める
    return roomCondIndicators.concat(
        Array(9 - roomCondIndicators.length)
            .fill(null)
            .map((curr, index) => <div key={`vacant-${index}`}></div>)
    );
}