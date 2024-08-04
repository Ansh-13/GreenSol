"use client";

import { createContext, useContext, useState } from "react";

export interface ROI_Data {
  Annual_Electricity_Consumption: number;
  Annual_Electricity_Cost: number;
  Shadow_Free_Space: number;
  Requirement_Type: string;
}

export type RoiContextType = {
  Data: ROI_Data[];
  setData: (data: ROI_Data[]) => void;
};

export const RoiContext = createContext<any>(undefined);

export default function RoiDataContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [Data, setData] = useState([]);
  return (
    <RoiContext.Provider value={{ Data, setData }}>
      {children}
    </RoiContext.Provider>
  );
}
