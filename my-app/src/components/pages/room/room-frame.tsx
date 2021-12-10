import { IOperationConditionSgl } from "api/operation-condition-api/operation-condition"
import { OperationConditionAllContext } from "context/oc-context"
import { RoomsInfoContext } from "context/ri-context"
import React, { useContext } from "react"
import { Route, Routes } from "react-router"
import { getIntegratedDataset } from "./integrated-apparatus-dara-set"
import { RoomApparatus } from "./room-apparatus/room-apparatus"
import { RoomDataNotFound } from "./room-data-not-found"
import { RoomHeader } from "./room-header"
import { RoomIndex } from "./room-index/room-index"

export const RoomIdContext = React.createContext("");

function useOperationConditionSgl(roomId: string): IOperationConditionSgl | null {
    const opeCondAll = useContext(OperationConditionAllContext);
    const apparatus = opeCondAll?.rooms?.find(room => room.id === roomId)?.apparatus;
    return apparatus ? { apparatus: apparatus } : null;
}

export const RoomFrame = ({ roomId }: { roomId: string }) => {
    // フレームコンポーネントのレベルで各子コンポーネントに渡す情報の問い合わせを行う
    //// 配下のコンポーネントではパラメータで渡されたデータのみ取り扱う
    const myroomInfo = useContext(RoomsInfoContext)?.rooms?.find(room => room.id === roomId);
    const myOpeCond = useOperationConditionSgl(roomId);
    const integratedDataset = (myroomInfo && myOpeCond) ? getIntegratedDataset(myroomInfo, myOpeCond) : null;
    return (
        <RoomIdContext.Provider value={roomId}>
            {myroomInfo && myOpeCond
                ? (
                    <div>
                        <RoomHeader myroomInfo={myroomInfo}></RoomHeader>
                        <Routes>
                            <Route path="index" element={
                                <RoomIndex
                                    roomId={roomId} myOpeCond={myOpeCond} myroomInfo={myroomInfo}
                                ></RoomIndex>
                            }></Route>
                            {integratedDataset?.map(data => (
                                <Route key={data.id} path={data.id} element={
                                    <RoomApparatus
                                        integratedData={data}
                                    ></RoomApparatus>
                                }></Route>
                            ))}
                        </Routes>
                    </div>
                )
                : <RoomDataNotFound></RoomDataNotFound>
            }
        </RoomIdContext.Provider>

    )
}