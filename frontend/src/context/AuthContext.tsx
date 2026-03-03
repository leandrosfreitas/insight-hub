import { createContext, useState, useContext, type ReactNode } from "react";
import { api } from "../services/api";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("access_token")
    );

    const login = async (email: string, password: string) => {
        const response = await api.post("/auth/login", {
            username: email,
            password,
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            transformRequest: [(data) => {
                const params = new URLSearchParams();
                params.append("username", data.username);
                params.append("password", data.password);
                return params;
            }]
        });

        localStorage.setItem("access_token", response.data.access_token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
