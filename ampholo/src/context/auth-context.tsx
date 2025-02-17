import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    accessToken: string | null;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const authData = useContext(AuthContext);

    if (!authData) {
        throw new Error("useAuth must be called inside the provider")
    }
    return authData;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(()=> {
        return localStorage.getItem('token')
    });

    useEffect(() => {
        if(accessToken) {
            localStorage.setItem('token', accessToken)
        }else{
            localStorage.removeItem('token')
        }
    }, [accessToken])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};
