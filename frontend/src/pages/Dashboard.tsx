import { useEffect, useState } from "react";
import { api, getMetrics } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFilters } from "../context/FilterContext";

import { Layout } from "../components/layout/Layout";
import MetricCard from "../components/cards/MetricCard";
import DateFilter from "../components/filters/DateFilter";
import ThemeToggle from "../components/ui/ThemeToggle";

import IndicatorChart from "../components/charts/IndicatorChart";

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

  // ✅ CONTEXTO GLOBAL (FILTROS)
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

  // =============================
  // LOAD METRICS
  // =============================
  useEffect(() => {
    getMetrics()
      .then(data => setMetrics(data))
      .catch(err => console.error(err));
  }, []);

  // =============================
  // LOAD INDICATORS
  // =============================
  useEffect(() => {
    api.get("/indicators")
      .then(res => setIndicators(res.data))
      .catch(err => console.error(err));
  }, []);

  // =============================
  // LOAD DATAPOINTS (MULTI)
  // =============================
  useEffect(() => {

    if (selectedIndicators.length === 0) return;

    selectedIndicators.forEach(id => {

      api.get(`/indicators/${id}/datapoints`)
        .then(res => {

          let formatted: DataPoint[] = res.data.map((d: DataPoint) => ({
            date: new Date(d.date).toISOString(),
            value: d.value
          }));

          // filtro de período
          if (startDate && endDate) {
            formatted = formatted.filter((d: DataPoint) => {
              const current = new Date(d.date);
              return (
                current >= new Date(startDate) &&
                current <= new Date(endDate)
              );
            });
          }

          // formatação final
          formatted = formatted.map((d: DataPoint) => ({
            ...d,
            date: new Date(d.date).toLocaleDateString()
          }));

          setDataPoints(prev => ({
            ...prev,
            [id]: formatted
          }));

        })
        .catch(err => console.error(err));

    });

  }, [selectedIndicators, startDate, endDate]);

  // =============================
  // SELECT MULTI
  // =============================
  const handleSelectIndicator = (id: number) => {
    setSelectedIndicators(
      selectedIndicators.includes(id)
        ? selectedIndicators.filter(i => i !== id)
        : [...selectedIndicators, id]
    );
  };

  return (
    <Layout>

      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">

          <h1 className="text-2xl font-semibold dark:text-white">
            Dashboard
          </h1>

          <ThemeToggle />

        </div>

        {/* ADMIN */}
        {role === "admin" && (
          <div className="mb-6">
            <button
              onClick={() => navigate("/admin/indicators")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Cadastrar indicador
            </button>
          </div>
        )}

        {/* DATE FILTER */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <MetricCard title="Receita Total" value={`R$ ${metrics.revenue}`} />
            <MetricCard title="Pedidos" value={metrics.orders} />
            <MetricCard title="Ticket Médio" value={`R$ ${metrics.avg_ticket}`} />
            <MetricCard title="Produto Top" value={metrics.top_product} />
          </div>
        )}

        {/* SELECT MULTI */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border mb-8">

          <label className="block text-sm mb-3 dark:text-gray-300">
            Escolha um ou mais indicadores
          </label>

          <div className="flex flex-wrap gap-2">

            {indicators.map(ind => (

              <button
                key={ind.id}
                onClick={() => handleSelectIndicator(ind.id)}
                className={`px-3 py-2 rounded-lg text-sm border transition ${
                  selectedIndicators.includes(ind.id)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 dark:text-white"
                }`}
              >
                {ind.name}
              </button>

            ))}

          </div>

        </div>

        {/* CHARTS */}
        {selectedIndicators.length > 0 && (

          <div className="grid grid-cols-1 gap-6">

            {selectedIndicators.map(id => {

              const indicator = indicators.find(i => i.id === id);
              const data = dataPoints[id] || [];

              return (
                <div
                  key={id}
                  className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border"
                >
                  <h2 className="mb-4 font-medium dark:text-white">
                    {indicator?.name}
                  </h2>

                  <IndicatorChart data={data} />

                </div>
              );

            })}

          </div>

        )}

      </div>

    </Layout>
  );
};
