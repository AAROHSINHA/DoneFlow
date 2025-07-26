import { createContext } from "react";

interface loginInterface {
    loggedIn: boolean,
    email: string
    scrollTo: React.RefObject<HTMLDivElement | null>,
    name: string,
}


export const LoginContext = createContext<loginInterface | null>(null);