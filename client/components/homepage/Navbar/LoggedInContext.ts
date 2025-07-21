import { createContext } from "react";

interface LoggedInContextInterface {
  loggedIn : boolean | undefined,
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoginContext = createContext<LoggedInContextInterface>({
    loggedIn: false,
    setLoggedIn: () => {},
})