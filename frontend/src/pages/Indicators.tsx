import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Layout } from "../components/layout/Layout";

export default function Indicators() {

    const [indicators, setIndicators] = useState([])

    useEffect(() => {
        document.title = "Indicadores | InsightHub";
    }, []);

    useEffect(() => {
        api.get("/indicators").then(res => setIndicators(res.data))
    }, [])

    return (
        <Layout>

            <h1 className="text-2xl font-semibold mb-6">
                Indicadores
            </h1>

            <div className="grid md:grid-cols-2 gap-6">

                {indicators.map((ind: any) => (

                <div key={ind.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">

                    <h2 className="text-lg font-semibold mb-2">
                    {ind.name}
                    </h2>

                    <p className="text-sm text-gray-500 mb-2">
                    {ind.description}
                    </p>

                    <p className="text-xs">
                    Fonte: {ind.source}
                    </p>

                </div>

                ))}

            </div>

        </Layout>
    )
}
