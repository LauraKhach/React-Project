import { useContext, createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../helpers";

const currentUser = getCurrentUser();

const UserContext = createContext({
    user: {}
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({});
    
    useEffect(() => {
        setUser(currentUser);
    }, []);

    return (
        <UserContext.Provider 
            value={{ currentUser: user }}
        >
            {children}
        </UserContext.Provider>
    );
}