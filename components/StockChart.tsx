"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function StockChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        const chartData = json.products.slice(0, 10).map((p: any) => ({
          title: p.title,
          stock: p.stock,
        }))
        setData(chartData)
      })
  }, [])

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Top 10 Product Stock</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" angle={-45} textAnchor="end" interval={0} height={100} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="stock" stroke="#1f2937" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
