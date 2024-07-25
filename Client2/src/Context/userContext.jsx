import { useContext, useEffect, useState, createContext } from "react";


const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const updateUser = () => {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if (userInfo) {
                setUser(userInfo);
            } else {
                setUser(null);
            }
        };

        window.addEventListener("storage", updateUser);

        updateUser();

        return () => {
            window.removeEventListener("storage", updateUser);
        };
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
