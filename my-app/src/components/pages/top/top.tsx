import { useUpdateOCWhenInitialied } from "components/hooks/oc-management/update-oc";
import styled from "styled-components";
import { RoomCondIndicator } from "./room-cond-indicator";
import { tRoomCondInfos, useRoomCondInfos } from "./room-cond-info-hook"

const Head3Container = styled.div`
text-align:center;
`

const IndicatorBox = styled.div`
display:flex;
flex-wrap: wrap;
justify-content:center;
align-items: flex-start;
width:90%;
max-width:1050px;
margin:0 auto;
& > div{
    overflow-y:auto;
    width:calc(100% / 3);
    height: 210px;
    border:2px solid green;
    margin-left:-1px;
    margin-top:-1px;
}
`

const TblContainerDiv = styled.div`
&::-webkit-scrollbar{
    position:fixed;
    width:6px;
}
&::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
}
&::-webkit-scrollbar-thumb {
    background: rgb(110 110 110 / 50%);
    border-radius: 10px;
}
&::-webkit-scrollbar-thumb:hover {
    filter: brightness(125%);
}
`

export const Top = () => {
    useUpdateOCWhenInitialied();
    const roomCondIndicators = convInfosTo9ElemJSXes(useRoomCondInfos());
    return (
        <div>
            <Head3Container>
                <h3>各室運転状況インジケータ</h3>
            </Head3Container>
            <IndicatorBox data-testid="indicator-box">
                {roomCondIndicators}
            </IndicatorBox>
        </div>
    )
}

function convInfosTo9ElemJSXes(infos: tRoomCondInfos | null) {

    // infoオブジェクトをJSXにマッピング
    const roomCondIndicators = infos?.map(info => (
        <TblContainerDiv key={info.id}>
            <RoomCondIndicator roomCondInfo={info}></RoomCondIndicator>
        </TblContainerDiv>
    ));

    if (!roomCondIndicators) return null;

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