import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const AppContext = ({children}) => {

    const [loginInfo, setLoginInfo] = useState();
    const [email, setEmail] = useState();

    return(
        <Context.Provider value={{
            loginInfo, setLoginInfo,
            email, setEmail
        }}>
            {children}
        </Context.Provider>
    )
}
export default AppContext;