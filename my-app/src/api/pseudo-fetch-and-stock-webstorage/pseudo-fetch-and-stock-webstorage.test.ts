import * as PFSW from './pseudo-fetch-and-stock-webstorage'

const roomInfoForMock = {
    "rooms": [
        {
            "id": "room101",
            "apparatus": [
                {
                    "id": "ap001",
                    "name": "照明器具",
                    "settingType": "lighting"
                },
                {
                    "id": "ap002",
                    "name": "エアコン",
                    "settingType": "air-conditioner"
                }
            ]
        },
        {
            "id": "room102",
            "apparatus": [
                {
                    "id": "ap001",
                    "name": "照明器具",
                    "settingType": "lighting"
                },
                {
                    "id": "ap002",
                    "name": "床暖房",
                    "settingType": "floor-heating"
                }
            ]
        },
    ]
}

const opeCondInfoForMock = {
    "rooms": [
        {
            "id": "room101",
            "apparatus": [
                {
                    "id": "ap001",
                    "conditions": [
                        {
                            "name": "power-onoff",
                            "current": true,
                            "setPoint": true
                        },
                        {
                            "name": "illuminance",
                            "current": 400,
                            "setPoint": 500
                        }
                    ],
                    "error": {
                        "content": "",
                        "isError": false
                    }
                },
                {
                    "id": "ap002",
                    "conditions": [
                        {
                            "name": "power-onoff",
                            "current": true,
                            "setPoint": true
                        },
                        {
                            "name": "temperture",
                            "current": 27.5,
                            "setPoint": 27
                        }
                    ],
                    "error": {
                        "content": "",
                        "isError": false
                    }
                }
            ]
        },
        {
            "id": "room102",
            "apparatus": [
                {
                    "id": "ap001",
                    "conditions": [
                        {
                            "name": "power-onoff",
                            "current": true,
                            "setPoint": true
                        },
                        {
                            "name": "illuminance",
                            "current": 420,
                            "setPoint": 500
                        }
                    ],
                    "error": {
                        "content": "",
                        "isError": false
                    }
                },
                {
                    "id": "ap002",
                    "conditions": [
                        {
                            "name": "power-onoff",
                            "current": true,
                            "setPoint": true
                        },
                        {
                            "name": "temperture",
                            "current": 36.4,
                            "setPoint": 36.6
                        }
                    ],
                    "error": {
                        "content": "",
                        "isError": false
                    }
                }
            ]
        },
    ]
}

jest.useFakeTimers();

let spyGetPseudoDataRoomInfo;
let spyGetPseudoDataOpeCond: any;

beforeEach(() => {
    spyGetPseudoDataRoomInfo = jest.spyOn(PFSW, "getPseudoDataRoomInfo").mockImplementation(() => {
        return roomInfoForMock;
    })
    spyGetPseudoDataOpeCond = jest.spyOn(PFSW, "getPseudoDataOpeCond").mockImplementation(() => {
        return opeCondInfoForMock;
    })

});

describe('initialize', () => {
    it('should initialize and store data on first fetching', () => {
        expect(sessionStorage.getItem("roomInfo")).toBeNull();
        expect(sessionStorage.getItem("opeCondInfo")).toBeNull();
        (async () => {
            const result = await PFSW.doPseudoFetch("/some-url");
            expect(sessionStorage.getItem("roomInfo")).not.toBeNull();
            expect(sessionStorage.getItem("opeCondInfo")).not.toBeNull();

        })();
        jest.runAllTimers();

    });
    it('should not initialize on second fetching', async () => {
        jest.spyOn(sessionStorage, "setItem");
        await (async () => {
            (async () => {
                const result = await PFSW.doPseudoFetch("/some-url");
                expect(sessionStorage.getItem("roomInfo")).not.toBeNull();
                expect(sessionStorage.getItem("opeCondInfo")).not.toBeNull();

            })();
            jest.runAllTimers();
        })();
        (async () => {
            const result = await PFSW.doPseudoFetch("/some-url");
            expect(sessionStorage.setItem).toHaveBeenNthCalledWith(1, "roomInfo", JSON.stringify(roomInfoForMock));
            expect(sessionStorage.setItem).toHaveBeenNthCalledWith(1, "opeCondInfo", JSON.stringify(opeCondInfoForMock));

        })();
        jest.runAllTimers();

    });
});

describe('GET method', () => {
    it('should send room-info data', () => {
        (async () => {
            const result = await PFSW.doPseudoFetch("/api/info/rooms");
            expect(result.ok).toBe(true);
            expect(result.status).toBe(200);
            expect(result.json()).toEqual(roomInfoForMock);

        })();
        jest.runAllTimers();
    });
    it('should send operation-condition data', () => {
        (async () => {
            const result = await PFSW.doPseudoFetch("/api/ope-cond/rooms");
            expect(result.ok).toBe(true);
            expect(result.status).toBe(200);
            expect(result.json()).toEqual(opeCondInfoForMock);

        })();
        jest.runAllTimers();

    });
});

describe('PATCH method', () => {
    it('should set new set point conditions', () => {
        (async () => {
            const result = await PFSW.doPseudoFetch("/api/ope-cond/rooms/room101/apparatus/ap002", {
                method: "PATCH",
                body: JSON.stringify({
                    "conditions": [
                        {
                            "name": "power-onoff",
                            "set-point": false
                        },
                        {
                            "name": "temperture",
                            "set-point": 29.9
                        }
                    ]
                })
            });
            expect(result.ok).toBe(true);
            expect(result.status).toBe(200);
            const currentOpeCond: typeof opeCondInfoForMock = JSON.parse(sessionStorage.getItem("opeCondInfo") as string);

            expect(
                currentOpeCond.rooms.find(rm => rm.id === "room101")
                    ?.apparatus.find(ap => ap.id === "ap002")
                    ?.conditions.find(c => c.name === "power-onoff")?.setPoint
            ).toBe(false);
            expect(
                currentOpeCond.rooms.find(rm => rm.id === "room101")
                    ?.apparatus.find(ap => ap.id === "ap002")
                    ?.conditions.find(c => c.name === "temperture")?.setPoint
            ).toBe(29.9);

        })();
        jest.runAllTimers();

    });
    it('should recover error on the apparatus', () => {
        const opeCondWithErr = opeCondInfoForMock;
        opeCondWithErr.rooms.find(rm => rm.id === "room102")
            ?.apparatus.find(ap => ap.id === "ap001")
            ?.error != {
            isError: true,
            content: "some error"
        }
        spyGetPseudoDataOpeCond.mockClear();
        spyGetPseudoDataOpeCond.mockImplementation(() => {
            return opeCondWithErr;
        });
        (async () => {
            const result = await PFSW.doPseudoFetch("/api/ope-cond/rooms/room101/apparatus/ap002", {
                method: "PATCH",
                body: JSON.stringify({
                    "recover": true
                })
            });
            expect(result.ok).toBe(true);
            expect(result.status).toBe(200);
            const currentOpeCond: typeof opeCondInfoForMock = JSON.parse(sessionStorage.getItem("opeCondInfo") as string);

            expect(
                currentOpeCond.rooms.find(rm => rm.id === "room101")
                    ?.apparatus.find(ap => ap.id === "ap002")
                    ?.error.isError
            ).toBe(false);
            expect(
                currentOpeCond.rooms.find(rm => rm.id === "room101")
                    ?.apparatus.find(ap => ap.id === "ap002")
                    ?.error.content
            ).toBe("");

        })();
        jest.runAllTimers();
    });
});

it('should return 404 on fetch resource not to exist ', () => {

    (async () => {
        const result = await PFSW.doPseudoFetch("/url/not/to/exits");
        expect(result.ok).toBe(false);
        expect(result.status).toBe(404);

    })();
    jest.runAllTimers();
});
