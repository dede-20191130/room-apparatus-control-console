import { IOperationConditionAll } from "api/operation-condition-api/operation-condition";
import { IRoomsInfo } from "api/rooms-info-api/rooms-info";
import roomInfo from './pseudo-datas-room-info.json'
import opeCond from './pseudo-datas-ope-cond.json'
import { parseSafely } from "util/json/json-utils";

export function getPseudoDataRoomInfo(): IRoomsInfo {
    return roomInfo["roomNum5"];
}

export function getPseudoDataOpeCond(): IOperationConditionAll {
    return opeCond["roomNum5"];
}

export async function doPseudoFetch(input: string, init?: RequestInit | undefined) {
    // 疑似待機時間　サーバへのアクセス
    await new Promise(resolve => setTimeout(resolve, 50));
    // 初期化 sessionStorageに下記データオブジェクトを格納
    //// 部屋情報
    //// 機器運転情報
    if (!(sessionStorage.getItem("roomInfo") && sessionStorage.getItem("opeCondInfo"))) {
        sessionStorage.setItem("roomInfo", JSON.stringify(getPseudoDataRoomInfo()));
        sessionStorage.setItem("opeCondInfo", JSON.stringify(getPseudoDataOpeCond()));
    }

    // 疑似通信 URLに従ってデータを受信
    // メソッド
    const method = init?.method || "GET";
    //// urlの分割
    const urlDecomposed = input.match(/\/api\/(?<apiType>[^/]+)(\/(?<apiDetail>.*))?/);
    const apiType = urlDecomposed?.groups?.apiType
    const apiDetail = urlDecomposed?.groups?.apiDetail || ""

    //// 処理の分岐
    switch (method) {
        case "GET":
            switch (apiType) {
                case "info":
                    switch (apiDetail) {
                        case "rooms":
                        case "rooms/":
                            // 部屋情報を返却
                            return makeResponce(200, JSON.parse(sessionStorage.getItem("roomInfo") || "null") as IRoomsInfo);
                            break;

                    }
                    break;
                case "ope-cond":
                    switch (apiDetail) {
                        case "rooms":
                        case "rooms/":
                            // 運転状況（全室全機器）を返却
                            return makeResponce(200, JSON.parse(sessionStorage.getItem("opeCondInfo") || "null") as IOperationConditionAll);
                            break;

                    }
                    break;

            }

            break;
        case "PATCH":
            const requestBody = typeof init?.body === "string"
                ? parseSafely(init?.body)
                : null;
            if (!requestBody) break;
            switch (apiType) {
                case "ope-cond":
                    switch (true) {
                        case /^rooms\/[-\w]+\/apparatus\/[-\w]+/.test(apiDetail):
                            {
                                const capGroups = apiDetail.match(/^rooms\/(?<roomId>[-\w]+)\/apparatus\/(?<apparatusId>[-\w]+)/)?.groups!;
                                // patch用関数の呼び出し
                                if (requestBody["conditions"]) {
                                    setOCSettingPrms(capGroups.roomId, capGroups.apparatusId, requestBody.conditions);
                                    return makeResponce(200, null);
                                } else if (requestBody["recover"]) {
                                    recoverError(capGroups.roomId, capGroups.apparatusId, requestBody.recover);
                                    return makeResponce(200, null);

                                }
                            }
                            break;

                    }
                    break;

            }
            break;
    }

    // [404] リソース発見不可　
    return makeResponce(404, null);

}

function setOCSettingPrms(roomId: string, apparatusId: string, conditions: any[]) {
    const opeCondInfo = JSON.parse(sessionStorage.getItem("opeCondInfo") as string) as IOperationConditionAll;
    const tgtAppa = opeCondInfo
        ?.rooms
        ?.find(room => room.id === roomId)
        ?.apparatus
        ?.find(appa => appa.id === apparatusId);
    if (!tgtAppa) return;
    for (const condition of conditions) {
        const tgtCond = tgtAppa.conditions.find(cond => cond.name === condition.name);
        if (!tgtCond) continue;
        tgtCond.setPoint = condition["set-point"];
    }
    sessionStorage.setItem("opeCondInfo", JSON.stringify(opeCondInfo));
}

function recoverError(roomId: string, apparatusId: string, isRecover: boolean) {
    if (!isRecover) return;
    const opeCondInfo = JSON.parse(sessionStorage.getItem("opeCondInfo") as string) as IOperationConditionAll;
    const tgtAppa = opeCondInfo
        ?.rooms
        ?.find(room => room.id === roomId)
        ?.apparatus
        ?.find(appa => appa.id === apparatusId);
    if (!tgtAppa) return;
    tgtAppa.error.isError = false;
    tgtAppa.error.content = "";
    sessionStorage.setItem("opeCondInfo", JSON.stringify(opeCondInfo));
}

function makeResponce<T>(statusCode: number, jsonRtn: T) {
    return {
        ok: (statusCode >= 200 && statusCode <= 299) ? true : false,
        status: statusCode,
        async json() {
            return jsonRtn;
        }
    }
}