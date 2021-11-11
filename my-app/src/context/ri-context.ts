import React from "react";
import { IRoomsInfo } from '../api/rooms-info'

export const RoomsInfoContext = React.createContext<IRoomsInfo>(null as unknown as IRoomsInfo);