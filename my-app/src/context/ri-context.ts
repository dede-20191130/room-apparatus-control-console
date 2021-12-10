import { IRoomsInfo } from "api/rooms-info-api/rooms-info";
import React from "react";

export const RoomsInfoContext = React.createContext<IRoomsInfo | null>(null);