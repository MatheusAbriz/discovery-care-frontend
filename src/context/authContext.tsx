import { createContext, useContext, useState, type ReactNode } from "react";

export interface User{
    domain_email: string;
    phone: string;
    isAdmin: boolean;
}

interface AuthContextType{
    user: User | null;
    getUser: () => User;
    login: (userData: User) => void;
    logout: () => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AutoProvider")
    }
    return context;
}

interface AuthProviderProps{
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [ user, setUser ] = useState<User | null>(null);

    const login = async(userData: User) =>{
        setUser(userData);
        localStorage.setItem('users', JSON.stringify(userData));
    }
    
    const logout = () =>{
        setUser(null);
        localStorage.removeItem('users');
    }

    const getUser = () =>{
        const user: User = JSON.parse(localStorage.getItem('users')!)
        return user;
    }

    return(
        <AuthContext.Provider value={{ user, getUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}