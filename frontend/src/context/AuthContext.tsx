import { createContext, useState, useContext, type ReactNode } from "react";
import { api } from "../services/api";

interface AuthContextType {
    isAuthenticated: boolean;
    role: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("access_token")
    );

    const [role, setRole] = useState<string | null>(
        localStorage.getItem("role")
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

        const userRole = response.data.role ?? "user";
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("role", response.data.role);
        setIsAuthenticated(true);
        setRole(userRole);
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        setIsAuthenticated(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
