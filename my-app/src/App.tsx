import { IOperationConditionAll, IOperationConditionSmmry, fetchOperationConditionAll } from 'api/operation-condition-api/operation-condition';
import { IRoomsInfo, fetchRoomInfo } from 'api/rooms-info-api/rooms-info';
import { Header } from 'components/global/header/header';
import { Sidebar } from 'components/global/sidebar/sidebar';
import { Top } from 'components/pages/top/top';
import { RoomsInfoContext } from 'context/ri-context';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import isDeepEqual from 'fast-deep-equal/react'
import { OperationConditionAllContext, OperationConditionSmmyContext, updateOCsContext } from 'context/oc-context';
import { RoomFrame } from 'components/pages/room/room-frame';
import styled, { createGlobalStyle } from 'styled-components';
import { mediaQueries } from 'components/design/media-query-setting';
import { useLocationPathChange } from 'components/hooks/path/location-path-change-hook';

const FETCH_INTERVAL = (process.env.REACT_APP_FETCH_INTERVAL
  ? parseFloat(process.env.REACT_APP_FETCH_INTERVAL)
  : 10 * 1000) as number;

function getOCSmmy(OCAll: IOperationConditionAll | null): IOperationConditionSmmry | null {
  if (!OCAll) return null;
  return {
    rooms: OCAll.rooms.map(room => {
      return {
        id: room.id,
        apparatus: room.apparatus?.map(appa => ({
          id: appa.id,
          error: { isError: appa.error.isError }
        }))
      }
    })
  }
}

function useRoomInfo() {
  const [roomInfo, setRoomInfo] = useState<IRoomsInfo | null>(null);
  useEffect(() => {
    (async () => {
      // 部屋情報データ問い合わせ（初回のみ）
      const fetchedData = await fetchRoomInfo();
      setRoomInfo(fetchedData);
    })();
  }, [])
  return roomInfo;

}

function useOpeCondObj() {
  const [OCAll, setOCAll] = useState<IOperationConditionAll | null>(null);
  const OCAllRef = useRef<IOperationConditionAll | null>(null);
  const [OCSmmy, setOCSmmy] = useState<IOperationConditionSmmry | null>(null);

  async function updateOCAll() {
    const fecthedOCAllInterval = await fetchOperationConditionAll();
    //// deep equal成立しないならば更新
    if (!isDeepEqual(OCAllRef.current, fecthedOCAllInterval)) {
      OCAllRef.current = fecthedOCAllInterval;
      setOCAll(fecthedOCAllInterval);
    }
  }
  function updateOCSmmy() {
    const createdOCSmmy = getOCSmmy(OCAll);
    //// deep equal成立しないならば更新
    if (createdOCSmmy && !isDeepEqual(OCSmmy, createdOCSmmy)) setOCSmmy(createdOCSmmy);
  }

  async function updateOCs() {
    await updateOCAll();
  }

  useEffect(() => {
    (async () => {
      // 運転状況データ問い合わせ（初回）
      const fecthedOCAll = await fetchOperationConditionAll()
      OCAllRef.current = fecthedOCAll;
      setOCAll(fecthedOCAll);
      setInterval(async () => {
        // 運転状況データ問い合わせ（30秒ごと）
        await updateOCAll();
      }, FETCH_INTERVAL);
    })();
  }, [])

  // 各contextに振り分け処理
  updateOCSmmy();

  return { OCAll, OCSmmy, updateOCs };
}

const GlobalStyle = createGlobalStyle`
*, *:before, *:after{
  box-sizing:border-box;
}
body{
  margin:0;
  margin-top:70px;
  background-color:#000000;
  color:white;
  font-family:"Meiryo",'Times New Roman', Times, serif;
  
}
a{
  &:link{
    color: #2a9fd6;
    text-decoration: none;
  }
  &:visited{
    color: #2a9fd6;
    
  }
  &:hover{
    color: #dff5ff;
    text-decoration: underline;
  }
}
`
const FlexContainerDiv = styled.div`
display:flex;
min-height:calc(100vh - 70px);
`

const StyledMain = styled.main`
width:calc(100vw - 16px);
${mediaQueries("md")`
width:calc(100vw - 200px - 16px);

`}
`

function App() {
  const roomInfo = useRoomInfo();
  const OpeCondObj = useOpeCondObj();
  const [isActiveOfSidebar, setIsActiveOfSidebar] = useState(false);
  useLocationPathChange(() => {
    setIsActiveOfSidebar(false);
  });
  return (

    <div>
      <GlobalStyle></GlobalStyle>
      <RoomsInfoContext.Provider value={roomInfo}>
        <OperationConditionAllContext.Provider value={OpeCondObj.OCAll}>
          <OperationConditionSmmyContext.Provider value={OpeCondObj.OCSmmy}>
            <updateOCsContext.Provider value={OpeCondObj.updateOCs}>
              <Header setIsActiveOfSidebar={setIsActiveOfSidebar}></Header>
              <FlexContainerDiv>
                <Sidebar isActiveOfSidebar={isActiveOfSidebar}></Sidebar>
                <StyledMain>
                  <Routes>
                    <Route path="/top" element={<Top></Top>}></Route>
                    {roomInfo?.rooms?.map(room => {
                      return (
                        <Route key={room.id} path={`/${room.id}/*`} element={<RoomFrame roomId={room.id}></RoomFrame>}></Route>
                      )
                    })}
                    <Route path="/" element={<Navigate to="/top" />} />
                  </Routes>
                </StyledMain>
              </FlexContainerDiv>
            </updateOCsContext.Provider>
          </OperationConditionSmmyContext.Provider>
        </OperationConditionAllContext.Provider>
      </RoomsInfoContext.Provider>
    </div>
  );
}

export default App;
