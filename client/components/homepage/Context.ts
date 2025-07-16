import { createContext } from "react";

interface loginInterface {
    loggedIn: boolean,
    email: string
    scrollTo: React.RefObject<HTMLDivElement | null>;
}


export const LoginContext = createContext<loginInterface | null>(null);