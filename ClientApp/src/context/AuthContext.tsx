import React, { useState } from 'react';

/*
export interface IUserData {
    unique_name: string;
    email: string;
    full_name: string | null;
}*/

export const UserContext = React.createContext({} as any);

export const AuthProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const [userData, setUserData] = useState(null);

    return (
        <UserContext.Provider value={{ userData, setUserData}}>
            {children}
        </UserContext.Provider>
    );
}