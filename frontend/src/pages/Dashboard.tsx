import { useEffect, useState } from "react"
import { api, getMetrics } from "../services/api"
import MetricCard from "../components/layout/MetricCard"
import { Layout } from "../components/layout/Layout"
import DateFilter from "../components/layout/DateFilter"
import ThemeToggle from "../components/layout/ThemeToggle"
import IndicatorComparison from "../components/charts/IndicatorComparison"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

interface Indicator {
  id: number
  name: string
}

interface DataPoint {
  date: string
  value: number
}

interface Metrics {
  revenue: number
  orders: number
  avg_ticket: number
  top_product: string
}

export const Dashboard = () => {

  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [selectedIndicator, setSelectedIndicator] = useState<number | null>(null)
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([])
  const [metrics, setMetrics] = useState<Metrics | null>(null)

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    getMetrics().then(data => setMetrics(data))
  }, [])

  useEffect(() => {
    api.get("/indicators")
      .then(res => setIndicators(res.data))
  }, [])

  useEffect(() => {

    if(selectedIndicator){

      api.get(`/indicators/${selectedIndicator}/datapoints`)
        .then(res => {

          const formatted = res.data.map((d: DataPoint) => ({
            ...d,
            date: new Date(d.date).toLocaleDateString()
          }))

          setDataPoints(formatted)

        })

    }

  }, [selectedIndicator])

  const currentValue =
    dataPoints.length > 0
      ? dataPoints[dataPoints.length - 1].value
      : 0

  const previousValue =
    dataPoints.length > 1
      ? dataPoints[dataPoints.length - 2].value
      : 0

  return (

    <Layout>

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-semibold">
            Dashboard
          </h1>

          <ThemeToggle />

        </div>


        {/* DATE FILTER */}

        <div className="mb-6">

          <DateFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />

        </div>


        {/* METRIC CARDS */}

        {metrics && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            <MetricCard
              title="Receita Total"
              value={`R$ ${metrics.revenue}`}
            />

            <MetricCard
              title="Pedidos"
              value={metrics.orders}
            />

            <MetricCard
              title="Ticket Médio"
              value={`R$ ${metrics.avg_ticket}`}
            />

            <MetricCard
              title="Produto Top"
              value={metrics.top_product}
            />

          </div>

        )}

        {/* INDICADOR COMPARAÇÃO */}

        {dataPoints.length > 1 && (
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            
            <IndicatorComparison
              title="Variação do Indicador"
              current={currentValue}
              previous={previousValue}
            />

          </div>
          
        )}

        {/* INDICATOR SELECT */}

        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border mb-8">

          <label className="block text-sm mb-2">
            Escolha um indicador
          </label>

          <select
            className="border rounded px-3 py-2 w-64 dark:bg-gray-800"
            onChange={(e)=> {
              const value = e.target.value
              if (value) setSelectedIndicator(Number(value))
            }}
          >

            <option value="">
              Selecionar
            </option>

            {indicators.map(ind => (

              <option key={ind.id} value={ind.id}>
                {ind.name}
              </option>

            ))}

          </select>

        </div>


        {/* CHART */}

        {dataPoints.length > 0 && (

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border">

            <h2 className="mb-4 font-medium">
              Evolução do indicador
            </h2>

            <ResponsiveContainer width="100%" height={400}>

              <LineChart data={dataPoints}>

                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis dataKey="date"/>

                <YAxis/>

                <Tooltip/>

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        )}

      </div>

    </Layout>

  )
}
