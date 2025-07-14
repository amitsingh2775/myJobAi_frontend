'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

export default function RatingChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(json => {
        const grouped = json.products.reduce((acc: any, product: any) => {
          const rating = Math.floor(product.rating)
          acc[rating] = (acc[rating] || 0) + 1
          return acc
        }, {})

        const chartData = Object.entries(grouped).map(([rating, count]) => ({
          rating,
          count,
        }))

        setData(chartData as any)
      })
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Rating Distribution
        </h2>
        <p className="text-sm text-gray-500">
          Distribution of product ratings (rounded to nearest integer)
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="rating" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#111827" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
