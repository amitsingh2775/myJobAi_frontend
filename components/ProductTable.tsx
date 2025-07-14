'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import api from '@/lib/axios'

const LIMIT = 10

export default function ProductTable() {
  const [products, setProducts] = useState<any[]>([])
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  const fetchProducts = useCallback(async () => {
    const res = await api.get(`/api/products?limit=${LIMIT}&skip=${skip}`)
    const data = res.data
    setProducts(prev => [...prev, ...data.products])
    setHasMore(skip + LIMIT < data.total)
  }, [skip])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setSkip(prev => prev + LIMIT)
      }
    })

    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [hasMore])

  return (
    <div className="w-full bg-white rounded-md shadow-md overflow-hidden">
      {/* Responsive Scrollable Table Container */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableCaption className="text-sm text-gray-500">
            All available products (scroll to load more)
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => (
              <TableRow key={`${product.id}-${skip}`}>
                <TableCell>
                  <div className="w-14 h-14 rounded-md overflow-hidden border">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium whitespace-nowrap max-w-[160px] truncate">
                  {product.title}
                </TableCell>
                <TableCell className="whitespace-nowrap max-w-[120px] truncate">
                  {product.brand}
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="font-semibold">
                Total Loaded
              </TableCell>
              <TableCell>{products.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Loader */}
      <div
        ref={loaderRef}
        className="h-12 flex items-center justify-center text-gray-500 text-sm"
      >
        {hasMore ? 'Loading more...' : 'No more products'}
      </div>
    </div>
  )
}
