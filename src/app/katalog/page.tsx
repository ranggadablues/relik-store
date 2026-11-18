'use client'

import CatalogPage from '@/components/katalog/CatalogPage'
import { useAppNavigate } from '@/lib/useAppNavigate'

export default function CatalogRoute() {
  const navigate = useAppNavigate()
  return <CatalogPage navigate={navigate} />
}
