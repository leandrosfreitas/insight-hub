import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

export default function IndicatorAreaChart({ data }: any) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    fill="#93c5fd"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}
