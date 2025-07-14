'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function CategoryChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((json) => {
        const grouped = json.products.reduce((acc: any, p: any) => {
          acc[p.category] = (acc[p.category] || 0) + 1;
          return acc;
        }, {});
        const chartData = Object.entries(grouped).map(([category, count]) => ({
          category,
          count,
        }));
        setData(chartData as any);
      });
  }, []);

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full">
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
        Category Distribution
      </h2>

      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="category"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={90}
              tick={{ fontSize: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#1f2937" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
