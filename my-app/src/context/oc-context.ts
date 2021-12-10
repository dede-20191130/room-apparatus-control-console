import { IOperationConditionAll, IOperationConditionSmmry } from "api/operation-condition-api/operation-condition";
import React from "react";

export const OperationConditionAllContext = React.createContext<IOperationConditionAll | null>(null);
export const OperationConditionSmmyContext = React.createContext<IOperationConditionSmmry | null>(null);
export const updateOCsContext = React.createContext<(() => Promise<void>) | null>(null);
