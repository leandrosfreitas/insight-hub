import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export const Dashboard = () => {
    const [indicators, setIndicators] = useState<any[]>([]);
    const { logout } = useAuth();

    useEffect(() => {
        api.get("/indicators")
            .then(res => setIndicators(res.data))
            .catch(() => alert("Erro ao carregar indicadores"));
    }, []);

    return (
        <div style={{ padding: 40 }}>
            <h2>Dashboard</h2>
            <button onClick={logout}>Logout</button>

            <ul>
                {indicators.map(ind => (
                    <li key={ind.id}>
                        {ind.name} - {ind.source}
                    </li>
                ))}
            </ul>
        </div>
    )
}
