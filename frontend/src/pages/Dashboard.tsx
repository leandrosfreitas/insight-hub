import { useEffect, useState } from "react";
import { api, getMetrics } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { Layout } from "../components/layout/Layout";
import MetricCard from "../components/cards/MetricCard";
import DateFilter from "../components/filters/DateFilter";
import ThemeToggle from "../components/ui/ThemeToggle";

import IndicatorChart from "../components/charts/IndicatorChart";
import { useFilters } from "../context/FilterContext";

interface Indicator {
  id: number;
  name: string;
}

interface DataPoint {
  date: string;
  value: number;
}

interface Metrics {
  revenue: number;
  orders: number;
  avg_ticket: number;
  top_product: string;
}

export const Dashboard = () => {

  const { role } = useAuth();
  const navigate = useNavigate();

  const {
    selectedIndicators,
    setSelectedIndicators,
    startDate,
    setStartDate,
    endDate,
    setEndDate
  } = useFilters();

  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [dataPoints, setDataPoints] = useState<Record<number, DataPoint[]>>({});
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    getMetrics().then(setMetrics);
  }, []);

  useEffect(() => {
    api.get("/indicators").then(res => setIndicators(res.data));
  }, []);

  useEffect(() => {

    selectedIndicators.forEach(id => {

      api.get(`/indicators/${id}/datapoints`)
        .then(res => {

          let formatted: DataPoint[] = res.data.map((d: DataPoint) => ({
            date: new Date(d.date).toISOString(),
            value: d.value
          }));

          if (startDate && endDate) {
            formatted = formatted.filter((d: DataPoint) => {
              const current = new Date(d.date);
              return current >= new Date(startDate) && current <= new Date(endDate);
            });
          }

          formatted = formatted.map((d: DataPoint) => ({
            ...d,
            date: new Date(d.date).toLocaleDateString()
          }));

          setDataPoints(prev => ({
            ...prev,
            [id]: formatted
          }));

        });

    });

  }, [selectedIndicators, startDate, endDate]);

  const handleSelect = (id: number) => {
    setSelectedIndicators(
      selectedIndicators.includes(id)
        ? selectedIndicators.filter((i: number) => i !== id)
        : [...selectedIndicators, id]
    );
  };

  return (
    <Layout>

      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold dark:text-white">Dashboard</h1>
          <ThemeToggle />
        </div>

        {/* ADMIN */}
        {role === "admin" && (
          <button
            onClick={() => navigate("/admin/indicators")}
            className="mb-6 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Cadastrar indicador
          </button>
        )}

        {/* DATE FILTER (AGORA COM ESPAÇO) */}
        <div className="mb-6">
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>

        {/* METRICS */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
            <MetricCard title="Receita" value={metrics.revenue} />
            <MetricCard title="Pedidos" value={metrics.orders} />
            <MetricCard title="Ticket" value={metrics.avg_ticket} />
            <MetricCard title="Top Produto" value={metrics.top_product} />
          </div>
        )}

        {/* SELECT MULTI (AGORA COM ESPAÇO) */}
        <div className="mb-6 flex flex-wrap gap-2">
          {indicators.map(ind => (
            <button
              key={ind.id}
              onClick={() => handleSelect(ind.id)}
              className={`px-3 py-2 rounded ${
                selectedIndicators.includes(ind.id)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {ind.name}
            </button>
          ))}
        </div>

        {/* CHARTS */}
        {selectedIndicators.map(id => {
          const data = dataPoints[id] || [];
          const indicator = indicators.find(i => i.id === id);

          return (
            <div key={id} className="mb-6 bg-white dark:bg-gray-900 p-6 rounded shadow">
              <h2 className="mb-4 dark:text-white">{indicator?.name}</h2>
              <IndicatorChart data={data} />
            </div>
          );
        })}

      </div>

    </Layout>
  );
};
