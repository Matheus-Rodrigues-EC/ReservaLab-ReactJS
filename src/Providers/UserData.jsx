import React from "react";
import { useState } from "react";

export const UserDataContext = React.createContext({});

export const UserDataProvider = (props) => {

    const [UserData, setUserData] = useState({name: "", email: "", token: ""});

    return (
        <UserDataContext.Provider value={{UserData, setUserData}}>
            {props.children}
        </UserDataContext.Provider>
    );
};