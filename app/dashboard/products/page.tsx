"use client"
import ProductTable from '@/components/ProductTable'

export default function ProductsPage() {
 
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Products</h1>
      <ProductTable />
    
    </div>
  )
}
