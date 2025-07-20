import { createContext } from "react";

interface DashboardContextInterface {
    email: string,
    name: string,
}
export const DashboardContext = createContext<DashboardContextInterface | null>(null);
