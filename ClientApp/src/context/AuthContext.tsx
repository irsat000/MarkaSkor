import React, { createContext, useState } from 'react';

export interface IUserData {
    unique_name: string;
    email: string;
    full_name: string | null;
}

export const UserContext = React.createContext({
    userData: null,
    setUserData: (e: any) => { }
});

export const AuthProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const value = { userData, setUserData };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}