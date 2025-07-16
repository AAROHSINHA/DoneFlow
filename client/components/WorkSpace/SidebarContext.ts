import { createContext } from "react";
export interface SidebarContextInterface {
    isOpen: boolean,
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    taskIsOpen: boolean,
    taskOnClose: React.Dispatch<React.SetStateAction<boolean>>
    taskReload: boolean
}
export const SidebarContext = createContext<SidebarContextInterface | null>(null);
