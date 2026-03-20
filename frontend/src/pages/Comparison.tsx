import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Layout } from "../components/layout/Layout";
import IndicatorComparison from "../components/charts/IndicatorComparison";
import DateFilter from "../components/filters/DateFilter";
import { useFilters } from "../context/FilterContext";

interface Indicator {
  id: number;
  name: string;
}

interface DataPoint {
  date: string;
  value: number;
}

export const Comparison = () => {

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

  useEffect(() => {
    document.title = "Comparação | InsightHub";
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

        <h1 className="text-2xl mb-6 dark:text-white">Comparação</h1>

        <DateFilter
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

        <div className="my-6 flex flex-wrap gap-2">
          {indicators.map(ind => (
            <button
              key={ind.id}
              onClick={() => handleSelect(ind.id)}
              className={`px-3 py-2 rounded ${
                selectedIndicators.includes(ind.id)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {ind.name}
            </button>
          ))}
        </div>

        <div className="grid gap-6">

          {selectedIndicators.map(id => {

            const data = dataPoints[id] || [];

            const current = data.length > 0 ? data[data.length - 1].value : 0;
            const previous = data.length > 1 ? data[data.length - 2].value : 0;

            return (
              <IndicatorComparison
                key={id}
                title={`Indicador ${id}`}
                current={current}
                previous={previous}
              />
            );
          })}

        </div>

      </div>

    </Layout>
  );
};
