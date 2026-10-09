'use client'

import { use } from 'react'
import ProductDetailPage from '@/components/pages/ProductDetailPage'
import { useAppNavigate } from '@/lib/useAppNavigate'

export default function ProductDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const productId = Number.parseInt(resolvedParams.id, 10) || 1
  const navigate = useAppNavigate()

  return <ProductDetailPage productId={productId} navigate={navigate} />
}
