import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Layout } from "../components/layout/Layout";
import DateFilter from "../components/filters/DateFilter";
import IndicatorComparison from "../components/charts/IndicatorComparison";

interface Indicator {
  id: number;
  name: string;
}

interface DataPoint {
  date: string;
  value: number;
}

export const Comparison = () => {

  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [selectedIndicators, setSelectedIndicators] = useState<number[]>([]);
  const [dataPoints, setDataPoints] = useState<Record<number, DataPoint[]>>({});

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // =============================
  // LOAD INDICATORS
  // =============================
  useEffect(() => {
    api.get("/indicators")
      .then(res => setIndicators(res.data))
      .catch(err => console.error(err));
  }, []);

  // =============================
  // LOAD DATAPOINTS
  // =============================
  useEffect(() => {

    if (selectedIndicators.length === 0) return;

    selectedIndicators.forEach(id => {

      api.get(`/indicators/${id}/datapoints`)
        .then(res => {

          let formatted: DataPoint[] = res.data.map((d: DataPoint) => ({
            ...d,
            date: new Date(d.date).toLocaleDateString()
          }));

          // filtro de período
          if (startDate && endDate) {
            formatted = formatted.filter((d: DataPoint) => {
              const current = new Date(d.date);
              return current >= new Date(startDate) && current <= new Date(endDate);
            });
          }

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
    setSelectedIndicators(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  return (
    <Layout>

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-2xl font-semibold mb-6 dark:text-white">
          Comparação de Indicadores
        </h1>

        {/* FILTRO DATA */}
        <div className="mb-6">
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>

        {/* SELECT MULTI */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border mb-8">

          <label className="block text-sm mb-3 dark:text-gray-300">
            Escolha indicadores
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

        {/* COMPARAÇÕES */}
        {selectedIndicators.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {selectedIndicators.map(id => {

              const indicator = indicators.find(i => i.id === id);
              const data = dataPoints[id] || [];

              const current =
                data.length > 0
                  ? data[data.length - 1].value
                  : 0;

              const previous =
                data.length > 1
                  ? data[data.length - 2].value
                  : 0;

              return (
                <IndicatorComparison
                  key={id}
                  title={indicator?.name || "Indicador"}
                  current={current}
                  previous={previous}
                />
              );

            })}

          </div>

        )}

      </div>

    </Layout>
  );
};
