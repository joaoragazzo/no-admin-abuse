import type { UserInfoDTO } from "@/interfaces/UserInfoDTO"
import AuthenticationService from "@/services/AuthenticationService";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextType {
    user: UserInfoDTO | undefined,
    setUser: React.Dispatch<React.SetStateAction<UserInfoDTO|undefined>>
    isAuthenticated: boolean,
    logout: () => void
}

const AuthContext = createContext<AuthContextType|undefined>(undefined);

export const AuthProvider = ({ children } : {children: ReactNode}) => {
    const [user, setUser] = useState<UserInfoDTO|undefined>(undefined);

    useEffect(() => {
        const stored = localStorage.getItem("token");
        if (stored) {
            AuthenticationService.steamLoginProfile()
            .then(res => setUser(res.user))
        }
    },[])

    const logout = () => {
        setUser(undefined);
        localStorage.removeItem("token");
    }

    const value: AuthContextType = {
        user,
        setUser,
        isAuthenticated: !!user,
        logout
    }

    return (
        <AuthContext.Provider
            value={value}
        >
            { children }
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}