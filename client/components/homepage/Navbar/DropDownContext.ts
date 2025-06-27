// DropDownContext.ts

import { createContext } from "react";

export interface DropDownContextInterface {
  dropDownStatus: string;
  setDropDownStatus: React.Dispatch<React.SetStateAction<string>>;
}

export const DropDownContext = createContext<DropDownContextInterface | null>(null);
