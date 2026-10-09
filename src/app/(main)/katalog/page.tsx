'use client'

import CatalogPage from '@/components/pages/CatalogPage'
import { useAppNavigate } from '@/lib/useAppNavigate'

export default function CatalogRoute() {
  const navigate = useAppNavigate()
  return <CatalogPage navigate={navigate} />
}
