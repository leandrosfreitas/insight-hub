import { useEffect, useState } from "react"
import { api } from "../services/api"
import { Layout } from "../components/layout/Layout"

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

export const Dashboard = () => {

  const [indicators,setIndicators] = useState<Indicator[]>([])
  const [selectedIndicator,setSelectedIndicator] = useState<number | null>(null)
  const [dataPoints,setDataPoints] = useState<DataPoint[]>([])

  useEffect(()=>{
    api.get("/indicators")
      .then(res=>setIndicators(res.data))
  },[])

  useEffect(()=>{
    if(selectedIndicator){
      api.get(`/indicators/${selectedIndicator}/datapoints`)
      .then(res=>{
        const formatted = res.data.map((d:DataPoint)=>({
          ...d,
          date:new Date(d.date).toLocaleDateString()
        }))
        setDataPoints(formatted)
      })
    }
  },[selectedIndicator])

  return (

    <Layout>

      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-semibold mb-6">
          Dashboard
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">

          <label className="block text-sm mb-2">
            Escolha um indicador
          </label>

          <select
            className="border rounded px-3 py-2 w-64"
            onChange={(e)=>setSelectedIndicator(Number(e.target.value))}
          >

            <option>Selecionar</option>

            {indicators.map(ind=>(
              <option key={ind.id} value={ind.id}>
                {ind.name}
              </option>
            ))}

          </select>

        </div>

        {dataPoints.length > 0 && (

          <div className="bg-white p-6 rounded-lg shadow-sm border">

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
