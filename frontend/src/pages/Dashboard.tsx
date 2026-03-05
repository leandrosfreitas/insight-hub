import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

interface Indicator {
    id: number;
    name: string;
    source: string;
}

interface DataPoint {
    date: string | number | Date;
    id: number;
    name: string;
    source: string;
}

export const Dashboard = () => {
    const [indicators, setIndicators] = useState<Indicator[]>([]);
    const [selectedIndicator, setSelectedIndicator] = useState<number | null>(null);
    const [dataPoints, setDataPoints] = useState<DataPoint[]>([])
    const { logout } = useAuth();

    useEffect(() => {
        api.get("/indicators")
            .then(res => setIndicators(res.data))
            .catch(() => alert("Erro ao carregar indicadores"));
    }, []);

    useEffect(() => {
        if (selectedIndicator) {
            api.get(`/indicators/${selectedIndicator}/datapoints`)
                .then(res => {
                    const formatted = res.data.map((item: DataPoint) => ({
                        ...item,
                        date: new Date(item.date).toLocaleDateString()
                    }));
                    setDataPoints(formatted);
                })
                .catch(() => alert("Erro ao carregar dados"));
        }
    }, [selectedIndicator]);

    return (
        <div style={{ padding: 40 }}>
            <h2>InsightHub Dashboard</h2>
            <button onClick={logout}>Logout</button>

            <h3>Selecionar Indicador</h3>

            <select
                onChange={(e) => setSelectedIndicator(Number(e.target.value))}
                defaultValue=""
            >
                <option value="" disabled>
                    Escolha um indicador
                </option>
                {indicators.map(ind => (
                    <option key={ind.id} value={ind.id}>
                        {ind.name}
                    </option>
                ))}
            </select>

            {dataPoints.length > 0 && (
                <>
                    <h3 style={{ marginTop: 40 }}>Evolução Temporal</h3>

                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={dataPoints}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#2563eb"
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    );
};
