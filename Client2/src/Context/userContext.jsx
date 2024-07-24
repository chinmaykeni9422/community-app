import { useContext, useEffect, useState, createContext } from "react";
import { useNavigate } from 'react-router-dom';

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            setUser(userInfo);
        }
    }, []);

    return (
        <userContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </userContext.Provider>
    );
}

export const UserState = () => {
    return useContext(userContext);
}
