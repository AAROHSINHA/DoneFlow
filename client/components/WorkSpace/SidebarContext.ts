import { createContext } from "react";
export interface SidebarContextInterface {
    isOpen: boolean,
    onClose: React.Dispatch<React.SetStateAction<boolean>>
}
export const SidebarContext = createContext<SidebarContextInterface | null>(null);
