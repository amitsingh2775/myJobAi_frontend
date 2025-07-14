"use client"

import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

export default function PriceRangeChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        const ranges = [
          { label: "0-20", min: 0, max: 20 },
          { label: "21-50", min: 21, max: 50 },
          { label: "51-100", min: 51, max: 100 },
          { label: "101-200", min: 101, max: 200 },
          { label: "201+", min: 201, max: Infinity },
        ]

        const rangeData = ranges.map((r) => {
          const count = json.products.filter(
            (p:any) => p.price >= r.min && p.price <= r.max
          ).length
          return { range: r.label, count }
        })

        setData(rangeData as any)
      })
  }, [])

  return (
    <div className="bg-white p-4 md:p-6 rounded-md shadow-md w-full overflow-x-auto">
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 text-center md:text-left">
        Price Range Distribution
      </h2>

      <div className="w-full min-w-[300px] h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="range"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-20}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#1f2937" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
