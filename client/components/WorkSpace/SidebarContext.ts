import { createContext } from "react";
export interface SidebarContextInterface {
    isOpen: boolean,
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    taskIsOpen: boolean,
    taskOnClose: React.Dispatch<React.SetStateAction<boolean>>
    taskReload: boolean,
    email: string,
    loggedIn: boolean,
    name: string
}
export const SidebarContext = createContext<SidebarContextInterface | null>(null);
